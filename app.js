import { STARTER_WORDS } from "./data.js";
import {
  STORAGE_KEY,
  LEITNER_INTERVALS,
  calculateStats,
  createInitialState,
  freshProgress,
  hydrateState,
  buildSession,
  getDueWords,
  getNewWords,
  isAnswerCorrect,
  localDateKey,
  normalizeAnswer,
  parseImport,
  reviewCard
} from "./core.js";

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

let state = loadState();
let currentView = "dashboard";
let wordPage = 1;
let session = [];
let sessionIndex = 0;
let sessionCorrect = 0;
let sessionAnswered = false;
let lastAnswerCorrect = false;
let toastTimer;

function allWords() {
  return [...STARTER_WORDS, ...state.customWords]
    .filter((word) => !state.removedWordIds.includes(word.id));
}

function loadState() {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return hydrateState(raw, STARTER_WORDS);
  } catch (error) {
    console.warn("La sauvegarde locale était illisible; un nouvel état a été créé.", error);
    return createInitialState(STARTER_WORDS);
  }
}

function saveState({ quiet = true } = {}) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (!quiet) showToast("Tes données ont été enregistrées sur cet appareil.");
}

function showToast(message, type = "success") {
  const toast = $("#toast");
  toast.classList.toggle("error", type === "error");
  toast.querySelector("span").textContent = type === "error" ? "!" : "✓";
  toast.querySelector("p").textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function initials(name) {
  return String(name || "M")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

function formatDate(date = new Date()) {
  const text = new Intl.DateTimeFormat("fr-FR", { weekday: "long", day: "numeric", month: "long" }).format(date);
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function formatReviewDate(timestamp) {
  if (!timestamp) return "Nouveau";
  const today = localDateKey(new Date());
  const key = localDateKey(new Date(timestamp));
  if (key === today) return "Aujourd'hui";
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "short" }).format(timestamp);
}

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Bonjour";
  if (hour < 18) return "Bon après-midi";
  return "Bonsoir";
}

function showView(view) {
  currentView = view;
  $$(".view").forEach((section) => section.classList.toggle("active", section.id === `view-${view}`));
  $$(".nav-item").forEach((button) => button.classList.toggle("active", button.dataset.view === view));
  const titles = {
    dashboard: `${greeting()}, ${state.profile.name}`,
    review: "Révision du jour",
    words: "Mon vocabulaire",
    progress: "Ma progression",
    settings: "Mes réglages"
  };
  $("#pageTitle").textContent = titles[view] || "Mémora";
  window.history.replaceState(null, "", `#${view}`);
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (view === "review") renderReviewSetup();
  if (view === "words") renderWords();
  if (view === "progress") renderProgress();
  if (view === "settings") renderSettings();
}

function renderShared() {
  const words = allWords();
  const stats = calculateStats(words, state);
  const todayCount = stats.today.reviewed;
  const goal = Number(state.profile.dailyGoal) || 15;
  const percent = Math.min(100, Math.round((todayCount / goal) * 100));

  $("#todayLabel").textContent = formatDate();
  $("#streakValue").textContent = stats.streak;
  $("#navDue").textContent = stats.due;
  $("#sideGoalText").textContent = `${todayCount} / ${goal}`;
  $("#sideGoalBar").style.width = `${percent}%`;
  $("#sideGoalHint").textContent = percent >= 100 ? "Objectif atteint. Bravo !" : `${Math.max(0, goal - todayCount)} réponses pour atteindre l'objectif.`;
  $("#profileShortcut").textContent = initials(state.profile.name);
  $("#goalRingMax").textContent = goal;
  document.documentElement.dataset.theme = state.settings.theme;
}

function renderDashboard() {
  const words = allWords();
  const stats = calculateStats(words, state);
  const todayCount = stats.today.reviewed;
  const goal = Number(state.profile.dailyGoal) || 15;
  const goalPercent = Math.min(100, Math.round((todayCount / goal) * 100));

  $("#dueStat").textContent = stats.due;
  $("#accuracyStat").textContent = stats.attempts ? `${stats.accuracy}%` : "—";
  $("#masteredStat").textContent = stats.mastered;
  $("#learnedStat").textContent = stats.learned;
  $("#totalWordsStat").textContent = `sur ${stats.total} mots`;
  $("#goalRingValue").textContent = todayCount;
  $("#goalRing").style.setProperty("--goal", `${goalPercent}%`);

  const due = getDueWords(words, state).length;
  const newWords = getNewWords(words, state, state.profile.newPerDay).length;
  if (due > 0) {
    $("#heroTitle").innerHTML = `${due} mot${due > 1 ? "s" : ""} t'attendent,<br>c'est le bon moment.`;
    $("#heroText").textContent = `Ta séance contient ${due} révision${due > 1 ? "s" : ""} programmée${due > 1 ? "s" : ""} et jusqu'à ${newWords} nouveau${newWords > 1 ? "x" : ""} mot${newWords > 1 ? "s" : ""}.`;
  } else if (goalPercent >= 100) {
    $("#heroTitle").innerHTML = "Objectif atteint,<br>la mémoire fait son travail.";
    $("#heroText").textContent = "Tu as terminé le programme du jour. Reviens demain pour respecter les intervalles Leitner.";
  } else {
    $("#heroTitle").innerHTML = "Quelques mots aujourd'hui,<br>du français pour longtemps.";
    $("#heroText").textContent = `${newWords} nouveaux mots peuvent entrer dans ta boîte aujourd'hui.`;
  }

  renderWeekChart();
  renderBoxOverview();
  renderShared();
}

function renderWeekChart() {
  const days = [];
  let max = 1;
  for (let offset = 6; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const value = state.activity[localDateKey(date)]?.reviewed || 0;
    max = Math.max(max, value);
    days.push({ date, value, today: offset === 0 });
  }
  const total = days.reduce((sum, day) => sum + day.value, 0);
  $("#weekTotal").textContent = `${total} révision${total > 1 ? "s" : ""}`;
  $("#weeklyChart").innerHTML = days.map((day) => {
    const height = day.value ? Math.max(12, Math.round((day.value / max) * 100)) : 5;
    const label = new Intl.DateTimeFormat("fr-FR", { weekday: "short" }).format(day.date).replace(".", "");
    return `<div class="chart-day${day.today ? " today" : ""}" title="${day.value} réponses"><div class="bar-space"><i style="height:${height}%"></i></div><span>${escapeHtml(label)}</span></div>`;
  }).join("");
}

function renderBoxOverview() {
  const progress = state.progress;
  const words = allWords();
  $("#boxOverview").innerHTML = [1, 2, 3, 4, 5].map((box) => {
    const count = words.filter((word) => progress[word.id]?.box === box).length;
    const interval = LEITNER_INTERVALS[box];
    return `<div class="mini-box"><div><b>${count}</b><span>Boîte ${box}</span></div><small>${interval} jour${interval > 1 ? "s" : ""}</small></div>`;
  }).join("");
}

function renderReviewSetup() {
  $("#reviewSession").classList.add("hidden");
  $("#sessionComplete").classList.add("hidden");
  const words = allWords();
  const due = getDueWords(words, state);
  const fresh = getNewWords(words, state, state.profile.newPerDay);
  const cards = buildSession(words, state);

  $("#setupDue").textContent = due.length;
  $("#setupNew").textContent = Math.max(0, cards.length - due.length);
  $("#setupMinutes").textContent = Math.max(1, Math.ceil(cards.length * 0.45));
  $("#setupDescription").textContent = cards.length
    ? `${cards.length} cartes sont prêtes, entre révisions prévues et nouveaux mots.`
    : "Tu as déjà terminé toutes les cartes prévues aujourd'hui.";
  $("#reviewSetup").classList.toggle("hidden", cards.length === 0);
  $("#reviewEmpty").classList.toggle("hidden", cards.length > 0);
}

function startSession({ free = false } = {}) {
  const words = allWords();
  const limit = Number($("#sessionLimit").value) || 0;
  if (free) {
    session = [...words]
      .sort((a, b) => (state.progress[a.id]?.lastReview || 0) - (state.progress[b.id]?.lastReview || 0))
      .slice(0, 10);
  } else {
    session = buildSession(words, state, limit);
  }
  if (!session.length) return renderReviewSetup();
  sessionIndex = 0;
  sessionCorrect = 0;
  $("#reviewSetup").classList.add("hidden");
  $("#reviewEmpty").classList.add("hidden");
  $("#sessionComplete").classList.add("hidden");
  $("#reviewSession").classList.remove("hidden");
  renderCard();
}

function renderCard() {
  const word = session[sessionIndex];
  if (!word) return finishSession();
  const progress = state.progress[word.id] || freshProgress();
  sessionAnswered = false;
  lastAnswerCorrect = false;
  $("#cardTheme").textContent = word.theme;
  $("#cardBox").textContent = progress.box ? `Boîte ${progress.box}` : "Nouveau";
  $("#cardTranslation").textContent = word.translation;
  $("#answerInput").value = "";
  $("#answerInput").disabled = false;
  $("#answerForm").classList.remove("hidden");
  $("#dontKnow").classList.remove("hidden");
  $("#feedback").classList.add("hidden");
  $("#feedback").classList.remove("wrong");
  $("#sessionCounter").textContent = `Carte ${sessionIndex + 1} sur ${session.length}`;
  $("#sessionScore").textContent = `${sessionCorrect} correcte${sessionCorrect > 1 ? "s" : ""}`;
  $("#sessionBar").style.width = `${Math.round((sessionIndex / session.length) * 100)}%`;
  setTimeout(() => $("#answerInput").focus(), 80);
}

function revealAnswer(correct) {
  if (sessionAnswered) return;
  const word = session[sessionIndex];
  sessionAnswered = true;
  lastAnswerCorrect = correct;
  $("#answerForm").classList.add("hidden");
  $("#dontKnow").classList.add("hidden");
  const feedback = $("#feedback");
  feedback.classList.remove("hidden");
  feedback.classList.toggle("wrong", !correct);
  $("#feedbackMark").textContent = correct ? "✓" : "!";
  $("#feedbackLabel").textContent = correct ? "Bonne réponse" : "La bonne réponse";
  $("#correctTerm").textContent = word.term;
  $("#wordExample").textContent = word.example || "Répète le mot à voix haute avant de continuer.";
  speak(word.term);
}

function rateCurrentCard(rating) {
  if (!sessionAnswered) return;
  const word = session[sessionIndex];
  const effectiveRating = rating === "again" ? "again" : rating;
  reviewCard(state, word.id, effectiveRating);
  if (effectiveRating !== "again") sessionCorrect += 1;
  saveState();
  sessionIndex += 1;
  renderShared();
  if (sessionIndex >= session.length) finishSession();
  else renderCard();
}

function finishSession() {
  $("#reviewSession").classList.add("hidden");
  $("#reviewSetup").classList.add("hidden");
  $("#reviewEmpty").classList.add("hidden");
  $("#sessionComplete").classList.remove("hidden");
  const reviewed = session.length;
  const accuracy = reviewed ? Math.round((sessionCorrect / reviewed) * 100) : 0;
  $("#completeReviewed").textContent = reviewed;
  $("#completeCorrect").textContent = sessionCorrect;
  $("#completeAccuracy").textContent = `${accuracy}%`;
  $("#completeText").textContent = accuracy >= 80
    ? "Très belle précision. Les intervalles ont été ajustés pour la prochaine séance."
    : "Les mots difficiles sont revenus en boîte 1 : tu les reverras bientôt.";
  renderDashboard();
}

function speak(text) {
  if (!("speechSynthesis" in window)) {
    showToast("La synthèse vocale n'est pas disponible dans ce navigateur.", "error");
    return;
  }
  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "fr-FR";
  utterance.rate = Number(state.settings.voiceRate) || .9;
  const voice = speechSynthesis.getVoices().find((item) => item.lang.toLowerCase().startsWith("fr"));
  if (voice) utterance.voice = voice;
  speechSynthesis.speak(utterance);
}

function populateThemeFilter() {
  const select = $("#themeFilter");
  const selected = select.value;
  const themes = [...new Set(allWords().map((word) => word.theme))].sort((a, b) => a.localeCompare(b, "fr"));
  select.innerHTML = `<option value="all">Tous les thèmes</option>${themes.map((theme) => `<option value="${escapeHtml(theme)}">${escapeHtml(theme)}</option>`).join("")}`;
  select.value = themes.includes(selected) ? selected : "all";
}

function filteredWords() {
  const query = normalizeAnswer($("#wordSearch").value);
  const rawQuery = $("#wordSearch").value.trim().toLocaleLowerCase("fa");
  const theme = $("#themeFilter").value;
  const box = $("#boxFilter").value;
  return allWords().filter((word) => {
    const progress = state.progress[word.id] || freshProgress();
    const matchesQuery = !query
      || normalizeAnswer(word.term).includes(query)
      || word.translation.toLocaleLowerCase("fa").includes(rawQuery)
      || normalizeAnswer(word.theme).includes(query);
    return matchesQuery && (theme === "all" || word.theme === theme) && (box === "all" || progress.box === Number(box));
  });
}

function renderWords() {
  populateThemeFilter();
  const words = filteredWords();
  const pageSize = 12;
  const pages = Math.max(1, Math.ceil(words.length / pageSize));
  wordPage = Math.min(wordPage, pages);
  const start = (wordPage - 1) * pageSize;
  const visible = words.slice(start, start + pageSize);
  $("#wordCountText").textContent = `${allWords().length} mots dans ta collection`;
  $("#pageInfo").textContent = `Page ${wordPage} / ${pages}`;
  $("#prevPage").disabled = wordPage <= 1;
  $("#nextPage").disabled = wordPage >= pages;

  $("#wordList").innerHTML = visible.length ? visible.map((word) => {
    const progress = state.progress[word.id] || freshProgress();
    const dots = [1, 2, 3, 4, 5].map((box) => `<i class="${box <= progress.box ? "filled" : ""}"></i>`).join("");
    return `<div class="word-row" data-word-id="${escapeHtml(word.id)}">
      <div class="word-main"><strong lang="fr">${escapeHtml(word.term)}</strong><small dir="rtl" lang="fa">${escapeHtml(word.translation)}</small></div>
      <span class="theme-tag">${escapeHtml(word.theme)}</span>
      <div class="word-progress"><span class="box-dots">${dots}</span><span>${progress.box ? `Boîte ${progress.box} · ${formatReviewDate(progress.nextReview)}` : "Nouveau"}</span></div>
      <div class="row-actions">
        <button class="mini-action speak-word" type="button" title="Écouter" aria-label="Écouter ${escapeHtml(word.term)}"><svg viewBox="0 0 24 24"><path d="M5 10v4h3l4 3V7l-4 3zm10-1a4 4 0 0 1 0 6m2-8a7 7 0 0 1 0 10"/></svg></button>
        ${word.custom ? `<button class="mini-action edit-word" type="button" title="Modifier" aria-label="Modifier ${escapeHtml(word.term)}"><svg viewBox="0 0 24 24"><path d="m4 16-1 5 5-1L19 9l-4-4zM13 7l4 4"/></svg></button>` : ""}
        <button class="mini-action delete remove-word" type="button" title="Retirer" aria-label="Retirer ${escapeHtml(word.term)}"><svg viewBox="0 0 24 24"><path d="M4 7h16m-10 4v6m4-6v6M9 4h6l1 3H8zm-3 3 1 13h10l1-13"/></svg></button>
      </div>
    </div>`;
  }).join("") : `<div class="empty-list">Aucun mot ne correspond à ces filtres.</div>`;

  $$(".speak-word", $("#wordList")).forEach((button) => button.addEventListener("click", () => {
    const word = allWords().find((item) => item.id === button.closest(".word-row").dataset.wordId);
    if (word) speak(word.term);
  }));
  $$(".edit-word", $("#wordList")).forEach((button) => button.addEventListener("click", () => openWordDialog(button.closest(".word-row").dataset.wordId)));
  $$(".remove-word", $("#wordList")).forEach((button) => button.addEventListener("click", () => removeWord(button.closest(".word-row").dataset.wordId)));
}

function openWordDialog(wordId = null) {
  const word = wordId ? state.customWords.find((item) => item.id === wordId) : null;
  $("#wordDialogTitle").textContent = word ? "Modifier le mot" : "Ajouter un mot";
  $("#editingWordId").value = word?.id || "";
  $("#wordTerm").value = word?.term || "";
  $("#wordTranslation").value = word?.translation || "";
  $("#wordTheme").value = word?.theme || "Mes mots";
  $("#wordExampleInput").value = word?.example || "";
  $("#wordDialog").showModal();
  setTimeout(() => $("#wordTerm").focus(), 80);
}

function saveCustomWord(event) {
  event.preventDefault();
  const id = $("#editingWordId").value;
  const term = $("#wordTerm").value.trim();
  const translation = $("#wordTranslation").value.trim();
  const theme = $("#wordTheme").value.trim() || "Mes mots";
  const example = $("#wordExampleInput").value.trim();
  if (!term || !translation) return;

  const duplicate = allWords().find((word) => normalizeAnswer(word.term) === normalizeAnswer(term) && word.id !== id);
  if (duplicate) {
    showToast("Ce mot existe déjà dans ta collection.", "error");
    return;
  }

  if (id) {
    const index = state.customWords.findIndex((word) => word.id === id);
    if (index >= 0) state.customWords[index] = { ...state.customWords[index], term, translation, theme, example };
  } else {
    const newWord = { id: `custom-${Date.now()}`, term, translation, theme, example, custom: true };
    state.customWords.push(newWord);
    state.progress[newWord.id] = freshProgress();
  }
  saveState();
  $("#wordDialog").close();
  renderWords();
  renderDashboard();
  showToast(id ? "Le mot a été modifié." : "Le mot a été ajouté à ta collection.");
}

function removeWord(id) {
  const word = allWords().find((item) => item.id === id);
  if (!word) return;
  if (word.custom) state.customWords = state.customWords.filter((item) => item.id !== id);
  else if (!state.removedWordIds.includes(id)) state.removedWordIds.push(id);
  delete state.progress[id];
  saveState();
  renderWords();
  renderDashboard();
  showToast(`« ${word.term} » a été retiré.`);
}

function importWords(event) {
  event.preventDefault();
  const parsed = parseImport($("#importText").value, allWords());
  if (!parsed.words.length) {
    $("#importNote").textContent = parsed.errors.length ? `Format incorrect aux lignes : ${parsed.errors.join(", ")}.` : "Aucun nouveau mot à importer.";
    $("#importNote").classList.add("error");
    return;
  }
  for (const word of parsed.words) {
    state.customWords.push(word);
    state.progress[word.id] = freshProgress();
  }
  saveState();
  $("#importDialog").close();
  $("#importText").value = "";
  $("#importNote").textContent = "Les doublons sont ignorés automatiquement.";
  $("#importNote").classList.remove("error");
  renderWords();
  renderDashboard();
  showToast(`${parsed.words.length} mot${parsed.words.length > 1 ? "s ont" : " a"} été importé${parsed.words.length > 1 ? "s" : ""}.`);
}

function renderProgress() {
  const words = allWords();
  const stats = calculateStats(words, state);
  $("#masteryPercent").textContent = `${stats.mastery}%`;
  $("#masteryRing").style.setProperty("--mastery", `${stats.mastery}%`);
  $("#reportAttempts").textContent = stats.attempts;
  $("#reportCorrect").textContent = stats.correct;
  $("#reportDays").textContent = Object.values(state.activity).filter((day) => day.reviewed > 0).length;
  $("#reportStreak").textContent = stats.streak;
  $("#masteryTitle").textContent = stats.mastery >= 70 ? "Tu consolides un vrai vocabulaire A2." : stats.learned ? "Chaque boîte te rapproche de la maîtrise." : "Ton parcours commence ici.";
  $("#masteryDescription").textContent = `${stats.learned} mots ont commencé leur parcours et ${stats.mastered} sont dans la boîte 5.`;

  const cells = [];
  for (let offset = 29; offset >= 0; offset -= 1) {
    const date = new Date();
    date.setDate(date.getDate() - offset);
    const value = state.activity[localDateKey(date)]?.reviewed || 0;
    const level = value === 0 ? 0 : value < 5 ? 1 : value < 12 ? 2 : value < 20 ? 3 : 4;
    cells.push(`<i class="heat-cell level-${level}" title="${formatDate(date)} : ${value} réponses"></i>`);
  }
  $("#activityHeatmap").innerHTML = cells.join("");

  const hardest = words
    .map((word) => ({ word, progress: state.progress[word.id] || freshProgress() }))
    .filter((item) => item.progress.incorrect > 0)
    .sort((a, b) => b.progress.incorrect - a.progress.incorrect)
    .slice(0, 5);
  $("#hardWords").innerHTML = hardest.length ? hardest.map(({ word, progress }) => `<div class="hard-word"><span>${escapeHtml(word.term.charAt(0).toLowerCase())}</span><div><strong>${escapeHtml(word.term)}</strong><small dir="rtl" lang="fa">${escapeHtml(word.translation)}</small></div><b>${progress.incorrect} erreur${progress.incorrect > 1 ? "s" : ""}</b></div>`).join("") : `<div class="empty-list">Les mots difficiles apparaîtront après tes premières révisions.</div>`;
}

function renderSettings() {
  $("#profileName").value = state.profile.name;
  $("#dailyGoal").value = state.profile.dailyGoal;
  $("#newPerDay").value = state.profile.newPerDay;
}

function saveSettings() {
  state.profile.name = $("#profileName").value.trim() || "Masiha";
  state.profile.dailyGoal = Math.max(5, Math.min(100, Number($("#dailyGoal").value) || 15));
  state.profile.newPerDay = Math.max(1, Math.min(30, Number($("#newPerDay").value) || 8));
  saveState({ quiet: false });
  renderDashboard();
  showView("settings");
}

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function exportBackup() {
  downloadJson({ app: "Mémora", exportedAt: new Date().toISOString(), state }, `memora-sauvegarde-${localDateKey()}.json`);
  showToast("La sauvegarde complète a été téléchargée.");
}

function exportReport() {
  const words = allWords();
  const stats = calculateStats(words, state);
  const difficultWords = words
    .map((word) => ({ term: word.term, translation: word.translation, ...state.progress[word.id] }))
    .filter((word) => word.incorrect > 0)
    .sort((a, b) => b.incorrect - a.incorrect)
    .slice(0, 20);
  downloadJson({ generatedAt: new Date().toISOString(), stats, activity: state.activity, difficultWords }, `memora-bilan-${localDateKey()}.json`);
  showToast("Ton bilan a été exporté.");
}

function restoreBackup(file) {
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      const rawState = parsed.state || parsed;
      state = hydrateState(rawState, STARTER_WORDS);
      saveState();
      renderDashboard();
      showView("settings");
      showToast("La sauvegarde a été restaurée.");
    } catch (error) {
      showToast("Ce fichier n'est pas une sauvegarde Mémora valide.", "error");
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  state = createInitialState(STARTER_WORDS);
  saveState();
  $("#confirmDialog").close();
  renderDashboard();
  showView("dashboard");
  showToast("Les données locales ont été effacées.");
}

function toggleTheme() {
  state.settings.theme = state.settings.theme === "dark" ? "light" : "dark";
  saveState();
  renderShared();
}

function bindEvents() {
  $$("[data-view]").forEach((button) => button.addEventListener("click", () => showView(button.dataset.view)));
  $$("[data-go]").forEach((button) => button.addEventListener("click", (event) => {
    event.preventDefault();
    showView(button.dataset.go);
  }));
  $("#themeToggle").addEventListener("click", toggleTheme);
  $("#heroStart").addEventListener("click", () => showView("review"));
  $("#beginSession").addEventListener("click", () => startSession());
  $("#freePractice").addEventListener("click", () => startSession({ free: true }));
  $("#exitSession").addEventListener("click", () => {
    if (confirm("Quitter cette séance ? Les réponses déjà validées restent enregistrées.")) renderReviewSetup();
  });
  $("#answerForm").addEventListener("submit", (event) => {
    event.preventDefault();
    revealAnswer(isAnswerCorrect($("#answerInput").value, session[sessionIndex]));
  });
  $("#dontKnow").addEventListener("click", () => revealAnswer(false));
  $("#listenButton").addEventListener("click", () => session[sessionIndex] && speak(session[sessionIndex].term));
  $$("[data-rating]").forEach((button) => button.addEventListener("click", () => rateCurrentCard(button.dataset.rating)));

  [$("#wordSearch"), $("#themeFilter"), $("#boxFilter")].forEach((input) => input.addEventListener(input.tagName === "INPUT" ? "input" : "change", () => { wordPage = 1; renderWords(); }));
  $("#prevPage").addEventListener("click", () => { wordPage = Math.max(1, wordPage - 1); renderWords(); });
  $("#nextPage").addEventListener("click", () => { wordPage += 1; renderWords(); });
  $("#openAddWord").addEventListener("click", () => openWordDialog());
  $("#wordForm").addEventListener("submit", saveCustomWord);
  $("#openImport").addEventListener("click", () => $("#importDialog").showModal());
  $("#importForm").addEventListener("submit", importWords);
  $$(".close-dialog").forEach((button) => button.addEventListener("click", () => button.closest("dialog").close()));
  $$('dialog').forEach((dialog) => dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  }));

  $("#saveSettings").addEventListener("click", saveSettings);
  $("#downloadBackup").addEventListener("click", exportBackup);
  $("#exportProgress").addEventListener("click", exportReport);
  $("#restoreBackup").addEventListener("click", () => $("#restoreFile").click());
  $("#restoreFile").addEventListener("change", (event) => restoreBackup(event.target.files[0]));
  $("#resetData").addEventListener("click", () => $("#confirmDialog").showModal());
  $("#confirmReset").addEventListener("click", resetAllData);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      state = loadState();
      renderDashboard();
      if (currentView === "words") renderWords();
      if (currentView === "progress") renderProgress();
      showToast("Les données ont été mises à jour depuis un autre onglet.");
    }
  });
}

function init() {
  for (const word of allWords()) {
    state.progress[word.id] = { ...freshProgress(), ...(state.progress[word.id] || {}) };
  }
  saveState();
  bindEvents();
  renderDashboard();
  const requested = window.location.hash.slice(1);
  const views = ["dashboard", "review", "words", "progress", "settings"];
  showView(views.includes(requested) ? requested : "dashboard");
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

init();

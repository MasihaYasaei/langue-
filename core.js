export const STORAGE_KEY = "memora.francais.a2.v1";
export const STATE_VERSION = 1;

// A correct answer moves the card one box forward. A wrong answer returns it
// to box 1. Intervals are measured from the moment of review.
export const LEITNER_INTERVALS = Object.freeze({
  1: 1,
  2: 3,
  3: 7,
  4: 15,
  5: 30
});

export function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(timestamp, days) {
  const next = new Date(timestamp);
  next.setHours(12, 0, 0, 0);
  next.setDate(next.getDate() + days);
  return next.getTime();
}

export function normalizeAnswer(value = "") {
  return String(value)
    .trim()
    .toLocaleLowerCase("fr")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "'")
    .replace(/^(un|une|le|la|les|des|du|de la)\s+/i, "")
    .replace(/^l'/i, "")
    .replace(/[!?.,;:()]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function normalizeSpelling(value = "") {
  return String(value)
    .trim()
    .toLocaleLowerCase("fr")
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ");
}

export function isAnswerCorrect(input, word) {
  const accepted = [word.term, ...(word.alternatives || [])].map(normalizeSpelling);
  return accepted.includes(normalizeSpelling(input));
}

export function createInitialState(words, now = Date.now()) {
  const progress = {};
  for (const word of words) {
    progress[word.id] = freshProgress(now);
  }

  return {
    version: STATE_VERSION,
    createdAt: now,
    profile: { name: "Masiha", dailyGoal: 15, newPerDay: 8 },
    settings: { theme: "light", voiceRate: 0.9 },
    progress,
    customWords: [],
    removedWordIds: [],
    activity: {},
    edito: { daily: {}, openedUnits: [] }
  };
}

export function freshProgress(now = Date.now()) {
  return {
    box: 0,
    nextReview: now,
    lastReview: null,
    seen: 0,
    correct: 0,
    incorrect: 0,
    introducedAt: null
  };
}

export function hydrateState(rawState, words, now = Date.now()) {
  const base = createInitialState(words, now);
  if (!rawState || typeof rawState !== "object") return base;

  const state = {
    ...base,
    ...rawState,
    profile: { ...base.profile, ...(rawState.profile || {}) },
    settings: { ...base.settings, ...(rawState.settings || {}) },
    progress: { ...(rawState.progress || {}) },
    customWords: Array.isArray(rawState.customWords) ? rawState.customWords : [],
    removedWordIds: Array.isArray(rawState.removedWordIds) ? rawState.removedWordIds : [],
    activity: rawState.activity && typeof rawState.activity === "object" ? rawState.activity : {},
    edito: {
      daily: rawState.edito?.daily && typeof rawState.edito.daily === "object" ? rawState.edito.daily : {},
      openedUnits: Array.isArray(rawState.edito?.openedUnits) ? rawState.edito.openedUnits : []
    }
  };

  for (const word of [...words, ...state.customWords]) {
    state.progress[word.id] = { ...freshProgress(now), ...(state.progress[word.id] || {}) };
  }

  return state;
}

export function getDueWords(words, state, now = Date.now()) {
  return words
    .filter((word) => !state.removedWordIds.includes(word.id))
    .filter((word) => {
      const progress = state.progress[word.id];
      return progress && progress.box > 0 && progress.nextReview <= now;
    })
    .sort((a, b) => state.progress[a.id].nextReview - state.progress[b.id].nextReview);
}

export function getNewWords(words, state, limit = state.profile.newPerDay) {
  return words
    .filter((word) => !state.removedWordIds.includes(word.id))
    .filter((word) => (state.progress[word.id]?.box || 0) === 0)
    .slice(0, Math.max(0, limit));
}

export function buildSession(words, state, limit = 0, now = Date.now()) {
  const due = getDueWords(words, state, now);
  const introducedToday = Object.values(state.progress).filter((item) =>
    item.introducedAt && localDateKey(new Date(item.introducedAt)) === localDateKey(new Date(now))
  ).length;
  const newAllowance = Math.max(0, Number(state.profile.newPerDay) - introducedToday);
  const fresh = getNewWords(words, state, newAllowance);
  const unique = [...due, ...fresh.filter((word) => !due.some((item) => item.id === word.id))];
  return limit > 0 ? unique.slice(0, limit) : unique;
}

export function reviewCard(state, wordId, rating, now = Date.now()) {
  const current = { ...freshProgress(now), ...(state.progress[wordId] || {}) };
  const wasNew = current.box === 0;
  const isCorrect = rating === "correct" || rating === "easy";
  const nextBox = isCorrect ? Math.min(5, Math.max(1, current.box + 1)) : 1;
  const interval = rating === "easy"
    ? Math.min(60, LEITNER_INTERVALS[nextBox] * 2)
    : LEITNER_INTERVALS[nextBox];

  state.progress[wordId] = {
    ...current,
    box: nextBox,
    nextReview: addDays(now, interval),
    lastReview: now,
    seen: current.seen + 1,
    correct: current.correct + (isCorrect ? 1 : 0),
    incorrect: current.incorrect + (isCorrect ? 0 : 1),
    introducedAt: current.introducedAt || (wasNew ? now : current.introducedAt)
  };

  const key = localDateKey(new Date(now));
  const day = state.activity[key] || { reviewed: 0, correct: 0 };
  state.activity[key] = {
    reviewed: day.reviewed + 1,
    correct: day.correct + (isCorrect ? 1 : 0)
  };

  return state.progress[wordId];
}

export function calculateStats(words, state, now = Date.now()) {
  const activeWords = words.filter((word) => !state.removedWordIds.includes(word.id));
  const items = activeWords.map((word) => state.progress[word.id] || freshProgress(now));
  const attempts = items.reduce((sum, item) => sum + item.seen, 0);
  const correct = items.reduce((sum, item) => sum + item.correct, 0);
  const mastered = items.filter((item) => item.box === 5).length;
  const learned = items.filter((item) => item.box > 0).length;
  const today = state.activity[localDateKey(new Date(now))] || { reviewed: 0, correct: 0 };

  return {
    total: activeWords.length,
    due: getDueWords(activeWords, state, now).length,
    newCount: items.filter((item) => item.box === 0).length,
    attempts,
    correct,
    accuracy: attempts ? Math.round((correct / attempts) * 100) : 0,
    mastered,
    learned,
    mastery: activeWords.length ? Math.round((mastered / activeWords.length) * 100) : 0,
    today,
    streak: calculateStreak(state.activity, now)
  };
}

export function calculateStreak(activity, now = Date.now()) {
  let streak = 0;
  const cursor = new Date(now);
  cursor.setHours(12, 0, 0, 0);
  const todayKey = localDateKey(cursor);
  if (!activity[todayKey]?.reviewed) cursor.setDate(cursor.getDate() - 1);

  while (activity[localDateKey(cursor)]?.reviewed > 0) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export function parseImport(text, existingWords = []) {
  const existing = new Set(existingWords.map((word) => normalizeAnswer(word.term)));
  const words = [];
  const errors = [];

  String(text).split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) return;
    const parts = trimmed.split(/[|;\t]/).map((part) => part.trim());
    if (parts.length < 2 || !parts[0] || !parts[1]) {
      errors.push(index + 1);
      return;
    }
    const normalized = normalizeAnswer(parts[0]);
    if (existing.has(normalized) || words.some((word) => normalizeAnswer(word.term) === normalized)) return;
    words.push({
      id: `custom-${Date.now()}-${index}`,
      term: parts[0],
      translation: parts[1],
      definition: parts[1],
      theme: parts[2] || "Mes mots",
      example: parts[3] || "",
      custom: true
    });
  });

  return { words, errors };
}

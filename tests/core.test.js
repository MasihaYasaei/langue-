import test from "node:test";
import assert from "node:assert/strict";
import {
  LEITNER_INTERVALS,
  addDays,
  buildSession,
  calculateStreak,
  createInitialState,
  getDueWords,
  isAnswerCorrect,
  normalizeAnswer,
  parseImport,
  reviewCard
} from "../core.js";

const WORDS = [
  { id: "one", term: "un hébergement", translation: "اقامت", theme: "Voyage", alternatives: ["l'hébergement"] },
  { id: "two", term: "se réveiller", translation: "بیدار شدن", theme: "Quotidien" }
];

test("normalise les accents, articles et espaces", () => {
  assert.equal(normalizeAnswer("  L’HÉBERGEMENT ! "), "hebergement");
  assert.equal(normalizeAnswer("un hébergement"), "hebergement");
});

test("vérifie précisément les accents et accepte une variante déclarée", () => {
  assert.equal(isAnswerCorrect("hebergement", WORDS[0]), false);
  assert.equal(isAnswerCorrect("un hébergement", WORDS[0]), true);
  assert.equal(isAnswerCorrect("l'hébergement", WORDS[0]), true);
  assert.equal(isAnswerCorrect("hôtel", WORDS[0]), false);
});

test("une bonne réponse fait avancer la carte avec le bon intervalle", () => {
  const now = new Date("2026-07-15T12:00:00Z").getTime();
  const state = createInitialState(WORDS, now);
  reviewCard(state, "one", "correct", now);
  assert.equal(state.progress.one.box, 1);
  assert.equal(state.progress.one.correct, 1);
  assert.equal(state.progress.one.nextReview, addDays(now, LEITNER_INTERVALS[1]));
  reviewCard(state, "one", "correct", state.progress.one.nextReview);
  assert.equal(state.progress.one.box, 2);
});

test("une erreur renvoie toujours la carte en boîte 1", () => {
  const now = new Date("2026-07-15T12:00:00Z").getTime();
  const state = createInitialState(WORDS, now);
  state.progress.one.box = 4;
  reviewCard(state, "one", "again", now);
  assert.equal(state.progress.one.box, 1);
  assert.equal(state.progress.one.incorrect, 1);
});

test("la séance contient les cartes dues puis les nouveaux mots", () => {
  const now = new Date("2026-07-15T12:00:00Z").getTime();
  const state = createInitialState(WORDS, now);
  state.profile.newPerDay = 1;
  state.progress.two.box = 2;
  state.progress.two.nextReview = now - 1;
  assert.deepEqual(getDueWords(WORDS, state, now).map((word) => word.id), ["two"]);
  assert.deepEqual(buildSession(WORDS, state, 0, now).map((word) => word.id), ["two", "one"]);
});

test("calcule une série consécutive et tolère une journée en cours vide", () => {
  const now = new Date(2026, 6, 15, 12).getTime();
  const key = (daysAgo) => {
    const date = new Date(now);
    date.setDate(date.getDate() - daysAgo);
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  };
  assert.equal(calculateStreak({ [key(1)]: { reviewed: 4 }, [key(2)]: { reviewed: 2 } }, now), 2);
});

test("importe des lignes séparées et ignore les doublons", () => {
  const parsed = parseImport("se réveiller | تکراری | X\nprévoir | برنامه‌ریزی | Quotidien | Je prévois un voyage.", WORDS);
  assert.equal(parsed.words.length, 1);
  assert.equal(parsed.words[0].term, "prévoir");
  assert.equal(parsed.words[0].theme, "Quotidien");
});

import { EDITO_UNITS } from "./edito-data.js";

export const STARTER_WORDS = EDITO_UNITS.flatMap((unit) =>
  unit.vocabulary.map((item) => ({
    ...item,
    theme: `Unité ${unit.number} · ${unit.title}`,
    unitId: unit.id
  }))
);

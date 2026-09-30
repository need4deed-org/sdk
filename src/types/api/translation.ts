// Machine translation of user-entered content (be#1064). Each
// field_translation row records where its text came from and, for machine
// rows, where it is in the translation queue.

export enum TranslationOrigin {
  // Seeded, pre-translated reference data (skills, activities, languages, ...).
  REFERENCE = "reference",
  // Produced by the machine-translation worker.
  MACHINE = "machine",
  // Written or confirmed by a person. Never overwritten by MT while the
  // source text is unchanged.
  HUMAN = "human",
}

export enum TranslationStatus {
  // Queued for the machine-translation worker; no usable text yet.
  PENDING = "pending",
  DONE = "done",
  // Gave up (retries exhausted or output failed validation); readers fall
  // back to the original text.
  FAILED = "failed",
}

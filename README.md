# sdk

Shared types for need4deed.org

## Translation field names

`TranslationFieldsByEntity` exports the registered translation fields for each entity. Backend registry validation can use this map to keep accepted fields aligned with the SDK.

Opportunity translation endpoints use `info` for the field exposed as `description` by `ApiOpportunityGet` and `ApiOpportunityPatch`. Translation requests must use `info`; ordinary opportunity requests use `description`.

The registry includes reference-data entities as well as opportunities. This does not mean every translation route supports every registered entity; the existing review GET route accepts machine-translated entities only. CRUD route coverage must be checked against the backend contract before adoption.

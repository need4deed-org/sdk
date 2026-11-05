# sdk

Shared types for need4deed.org

## Translation field names

`TranslationFieldsByEntity` exports the registered translation fields for each entity. Backend registry validation can use this map to keep accepted fields aligned with the SDK.

Opportunity translation endpoints use `info` for the field exposed as `description` by `ApiOpportunityGet` and `ApiOpportunityPatch`. Translation requests must use `info`; ordinary opportunity requests use `description`.

## District aggregate contract

District aggregate responses include every configured district, including
districts with a count of zero. Volunteers are placed and counted in the
district of their home postcode, not their preferred districts. Each volunteer
is counted once. Aggregate requests use the same profile-specific `filter`
types as district marker requests.

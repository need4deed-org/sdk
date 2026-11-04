# sdk

Shared types for need4deed.org

## Translation field names

`TranslationFieldsByEntity` exports the registered translation fields for each entity. Backend registry validation can use this map to keep accepted fields aligned with the SDK.

Opportunity translation endpoints use `info` for the field exposed as `description` by `ApiOpportunityGet` and `ApiOpportunityPatch`. Translation requests must use `info`; ordinary opportunity requests use `description`.

## District aggregate contract

District aggregate responses include every configured district, including
districts with a count of zero. Volunteer counts are based on preferred
districts, so one volunteer may be counted in multiple districts; district
counts do not represent unique volunteers and should not be summed to calculate
a unique volunteer total. Aggregate requests use the same profile-specific
`filter` types as district marker requests.

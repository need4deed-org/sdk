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

## Admin email template contract

`Endpoint.ADMIN_EMAIL_TEMPLATE` is the collection path. Its GET response
lists `EmailTemplateName` values. GET and PUT on `/:name` use the detail
and update contracts respectively.

`EmailTemplateManifest` represents the existing CDN content directly: either
one flat template or content keyed by language. Preserve the stored shape,
existing body formats and `labels` when editing. A flat template has no
separate language variants, even when its body contains both languages.

Placeholder metadata is supplied by the backend per content variant (`null`
for a flat template). Names use the exact token key without braces, including
language suffixes where applicable. `allowedIn` lists permitted fields;
`required` means the token must occur in the variant, and `requiredIn` lists
any individual fields in which it must occur. Optional placeholders have an
empty `requiredIn` list. The backend validates these rules on PUT and returns
`invalid-placeholders` with the affected token, variant and field when known.

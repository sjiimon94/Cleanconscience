# Agent Instructions

## Required context (must)
Before making changes, read:
- `README.md`
- `docs/PRODUCT_SPEC.md`
- the latest entry in `docs/SESSION_LOG.md`

## Source of truth
- `docs/PRODUCT_SPEC.md` is authoritative.
- `docs/SESSION_LOG.md` is append-only history.
- If there is a conflict, PRODUCT_SPEC wins unless the log explicitly says “Approved spec change”.

## Hard constraints
- UI language: Swedish (`sv-SE`). Avoid English UI strings.
- Keep dependencies minimal.
- No login system, no comments, no custom payment flow in MVP.
- Keep builds passing (`npm run build`).

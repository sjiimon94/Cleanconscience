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

## Session log rule (must)
- For every work session that results in a commit or a meaningful plan, add a dated entry to `docs/SESSION_LOG.md`.
- If no requirements/spec changes were approved, include: `Approved spec changes: None`.
- If requirements/spec *were* changed, update `docs/PRODUCT_SPEC.md` and record the change in the same session log entry.


Suggested session entry template
- ## YYYY-MM-DD — Short title
Summary:
- What was done / decided (brief)

Implementation notes (optional):
- Key files touched, commands, env vars

Approved spec changes:
- None

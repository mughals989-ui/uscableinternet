# USCableInternet Website Editor

Private Cloudflare Worker prototype. Separate from the public site and CRM.

- Cloudflare Access protects the editor and the Worker independently verifies the Access JWT.
- Uses the dedicated D1 database for saved drafts and revision history.
- Lists HTML pages from the feature/website-visual-editor GitHub branch.
- Proxies public pages into an editing preview; text edits are saved as structured draft changes.
- Editor-specific logout cookie does not clear the shared Cloudflare Access session.
- Publishing remains disabled until a GitHub App with narrowly scoped repository Contents access is configured server-side. No personal token is placed in browser code.

Worker: uscableinternet-editor
D1 binding: DB -> 3d8aad3f-4de0-4245-816b-0d78a7c466c3
Access app: US Cable Internet Website Editor

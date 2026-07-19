# SeedVault360 — MVP Spec

**Prepared for:** Kevin Mobley, Dale Gonzalez
**Date:** July 16, 2026
**Status:** Draft — first pass at scoping the wedge product, not a build ticket yet

---

## 1. What SeedVault360 is, precisely

SeedVault360 is the **product**; ThoughtBox is the **platform** it's built on. That split matters enough to state as a rule up front (it mirrors the exact platform/product boundary ThoughtBox already enforces for Marketplace Central — see `thoughtbox/CLAUDE.md`):

- **ThoughtBox owns**: the connectors (cloud storage, email, contacts, bank feeds), the MCP server that exposes them to any AI client, auth/OAuth brokering, and the micro-apps runtime. Nothing in ThoughtBox should know what a "batch" or a "customer master" is.
- **SeedVault360 owns**: everything domain-specific — the customer model, the batch/yield engine, revenue tiering, cash-gap calculation, and the underwriting artifact itself. This logic lives in SV360's own repo and calls ThoughtBox's connectors; it does not get built into `thoughtbox/platform`.

The one exception is when a capability SV360 needs is generic enough that *any* ThoughtBox deployment would want it (a new data-source connector, for instance) — that goes in ThoughtBox, not SV360. See §4 (Square).

**Customer zero**: Anna Bell Mac & Cheese (Kevin Mobley, founder), a premium small food producer selling into hospitality (Hyatt, US Foods) and farmers markets, currently running production and finance entirely off a hand-built Apple Numbers workbook.

**First milestone**: get a small business from an unbankable P&L to an underwritable one, at the $10K working-capital threshold.

---

## 2. The problem, in one paragraph

A small producer's operational truth lives in three or four disconnected systems (a spreadsheet, a POS, a bank account, an email inbox) and the founder's head. No single system is authoritative, several silently omit the business's largest revenue channel or largest cost line, and the founder is the only one who can reconcile them — which they can't do in the moments that matter, like when a lender asks for proof of traction. The result: real, demonstrable businesses get declined for "insufficient income" not because the business is bad, but because the evidence that would prove otherwise is scattered across systems no underwriting process can ingest. (See the anonymized decline case in `SV360_Lessons_Learned_Weekly_Production_Jul2026-v1.md` §"Case in point.")

---

## 3. Gap analysis — what ThoughtBox already supports vs. what's new

| Challenge | Status | Note |
|---|---|---|
| Read the founder's spreadsheet/workbook | **Ready** | Drive/Dropbox/Box/OneDrive via `list_files`/`read_file` |
| Bank deposits, reconciliation ground truth | **Ready** | `list_bank_accounts`/`list_transactions` (Plaid) |
| Parse order emails, chase overdue AR by email | **Ready** | Gmail read/send + contacts, central-plane MCP tools |
| Founder "voice profile" for drafted comms | **Ready, as a memory schema** | `save_memory`/`recall_memories` already persist across sessions |
| Shareable, stakeholder-ready artifact (PDF/MD, emailed) | **Ready** | `create_file`, `share_file`, `send_email` cover this end to end |
| **Square** (POS/invoicing — the actual ground truth in nearly every lesson doc) | **Missing — new platform connector** | Not a storage/email/bank-Plaid provider. Distinct from the bank feed: Square shows gross, per-transaction detail, invoice status, and customer history; the bank feed shows net-of-fees deposits. Needed for both. See §4. |
| Understanding a spreadsheet's undocumented semantics (cup-vs-box, hidden formula gaps, stale Numbers cache) | **SV360-only** | Reading the file is platform work; knowing "Individual" secretly means "two-cup box" is domain logic |
| Customer master (property + buyer + delivery-path), batch/yield engine, three-tier revenue classification, cash-gap calc | **SV360-only** | Product-layer schema, built on ThoughtBox's connectors |
| CDFI/credit-bureau gating checks | **SV360-only, and not a live integration** | No credit-bureau connector exists or is implied; closer to static checklist content |
| Batch/yield optimization, wholesale negotiation structure, founder-distress checks | **SV360-only** | Domain logic/content, ships as later product surface, not MVP |

---

## 4. The MVP: one artifact, not the whole platform

Every source doc — independently, across different sessions — converges on the same deliverable. It's named directly in the v1 lessons doc ("SV360's first product") and again in the inventory-tracking doc ("the same document that makes a $10K facility underwritable"). That's the wedge:

> **One reconciled, tiered, shareable capital-readiness artifact** — order book + counterparty payment history + unit economics + cash-gap timing — assembled automatically from the systems the founder already uses, with every number backed by a control total and every gap flagged instead of hidden.

Not batch optimization (real value, but a feature, not the wedge). Not the CDFI-gating checklist (content, ships later). Not the wholesale-negotiation playbook (education). None of those is what a lender declines a loan over — this artifact is.

**MVP build steps:**

1. **Connect** — Drive/Dropbox spreadsheet (or direct entry) + Gmail + Plaid bank feed, all ready today, plus **Square** (§5), which the MVP cannot ship without: without it, reconciliation runs against a bank feed that's already net of Square's own fees — exactly the kind of silent understatement the lessons docs warn about repeatedly.
2. **Reconcile** — normalize into channel-level revenue (catching the "$0 Hyatt" class of bug), AR aging by counterparty, and true unit economics/contribution margin. This logic lives in SV360.
3. **Tier, never collapse** — committed/invoiced vs. event-target vs. speculative inventory value, always shown separately. Multiple docs independently arrived at this as a platform-wide invariant; violate it once and the artifact loses the trust it exists to build.
4. **Emit one artifact** — the underwriting evidence package, with an assumption log and variance flags attached, generated the same way every week so it's comparable over time.

**Explicitly out of scope for MVP** (real backlog, not discarded): integer-batch optimization, CDFI/credit-hygiene gating, founder-distress/future-self checks, wholesale-placement negotiation structure, voice-profile-aware drafting. All of these make the platform better; none of them is what turns a declined application into an approved one.

---

## 5. New connector needed: Square

Square is the transaction-level ground truth in nearly every lesson captured so far — POS sales, invoices, customer records, payout fees — and it is not redundant with the Plaid bank connector ThoughtBox already has (Plaid = net deposits after fees; Square = gross, per-transaction, invoice-level detail). A reconciliation product needs both to do the thing Lesson 2 in the inventory doc calls out: "the workbook's revenue formula... omits the [primary channel] entirely."

Per ThoughtBox's own rule of thumb ("would this be useful to a thoughtbox user who has never heard of AWS Marketplace or procurement?") — yes, unambiguously; Square is used by a huge share of small businesses well beyond food producers. This belongs in `thoughtbox/platform`, not in SV360's own repo. See the corresponding addition to `thoughtbox/docs/ARCHITECTURE.md`.

---

## 6. Open design question: files that aren't in the cloud

Some of the files that matter — especially early on, for a founder like Kevin who's mid-migration off a local Numbers workbook — won't be in a connected Drive/Dropbox/Box/OneDrive account. They'll be sitting on a laptop. ThoughtBox's split-plane architecture makes this a real constraint, not a preference: the central plane has no inbound path to a user's own machine, and building one (a sync agent, a local daemon) is a meaningfully different engineering commitment than anything else in this spec.

Three options, evaluated:

1. **Build local file access into the ThoughtBox UI/backend.** Rejected for MVP. This means either a browser-based upload flow (fine, but that's just "the user uploads to ThoughtBox-managed S3 storage," which already exists as the `thoughtbox` storage provider — no new capability needed) or a true local-folder sync agent (a real new product: a background process, install story, and ongoing sync-conflict handling). Not justified by SV360's MVP need.
2. **A local MCP filesystem server the user runs alongside their chat client.** This already exists as a pattern — Anthropic ships a reference filesystem MCP server, and both Claude Desktop and Claude Code support configuring one against a local directory. This is the technically correct answer for a power user: it doesn't require ThoughtBox to build anything, and it composes cleanly — the chat client sees both the ThoughtBox connector and the local filesystem tool in the same session and can move data between them (e.g., "read this local file and save a copy into ThoughtBox so it's in the reconciliation").
3. **Rely on the chat client's own native local access, with the right instruction.** This is already validated in the source material: one of the "Consolidated Reference" docs hit exactly this wall — "Local Cowork directory. Files on Kevin's hard drive... can't be read from a claude.ai chat session" — and the workaround that was actually used is "run this inside the Cowork desktop app pointed at that directory." Claude Desktop/Cowork already has native local file access; no MCP server is required for it specifically.

**Recommendation**: for MVP, rely on options 2 and 3 — i.e., don't build local file access into ThoughtBox at all. Document that SV360 works with whatever files the active chat client can see, whether that's ThoughtBox's cloud connectors or the client's own local access (native, or a locally-configured filesystem MCP server). This costs zero engineering and was already proven to work for Kevin. Revisit only if a non-technical customer can't self-serve this — at that point the honest fallback is "upload it to a connected Drive folder," not a new sync product.

---

## 7. Open design question: how does another business actually reach SeedVault360?

Anna Bell isn't a distribution problem — Kevin runs things from the command line and gets what he needs. It becomes a real problem the moment SV360 has a second customer who isn't Kevin. Two shapes, and they're not mutually exclusive:

**A URL (hosted web app).** The customer goes to a SV360-branded page, logs in, and links their accounts (Drive, Gmail, Square, bank) through the same per-user OAuth flow ThoughtBox's `/connect` page already implements. This is the low-friction default for a non-technical small business owner — no client configuration, and it matches how they'll actually use the output (an artifact they download or get emailed to forward to a lender). This is *not* the AWS Marketplace CDK Quick-Launch flow Marketplace Central uses — that flow assumes the customer is provisioning their own AWS infrastructure, which is the wrong shape entirely for a small food producer. SV360's customers should be **users within one SV360-operated tenant**, not each standing up their own cloud account, the same way an ordinary SaaS product works.

**A connector/command in their chat client.** The same MCP server ThoughtBox already exposes to Claude.ai (confirmed live and registered — `ai.thoughtbox.api/thoughts` in the MCP registry) could be scoped to surface SV360-specific tools, so a business owner adds it as a connector the same way any Claude.ai custom connector gets added, and works entirely from their existing chat client. This is the natural fit for the "MCP-UI/Apps" direction already noted in `thoughtbox/micro-apps/PLATFORM.md` — the underwriting artifact could render inline as an Apps surface instead of only as a downloadable file.

**Recommendation**: ship the URL surface first. It's the lower-friction path for the actual target customer (non-technical small business owner), it's the surface they'll want anyway for "forward this to my lender," and standing it up doesn't block the chat-client surface later — both paths authenticate the same per-user identity and call the same reconciliation logic underneath. Treat the MCP/chat-client surface as a near-term follow-on, not a competing decision to make now.

### 7.1 Resolved: standalone app on `seedvault360.com`, not a ThoughtBox-hosted micro-app

Two concrete options were on the table:

1. **A ThoughtBox-hosted micro-app** — SV360 registers a URL, ThoughtBox hosts the forms/prompts/flow/interface spec, zero infra for the developer. This is the model `thoughtbox/micro-apps/PLATFORM.md` is built for.
2. **A standalone app on the existing `seedvault360.com` domain** (React/Next/Astro — framework doesn't matter), using ThoughtBox purely as a connected backend service for connector/OAuth linking — the same integration pattern Marketplace Central already uses (`openConnectionManager()`, `/api/connections/`, `/api/auth/link-provider`; see `ARCHITECTURE.md` §"Integrating Connection Management into a Tenant Application"). One SV360 app instance, many end-users — explicitly *not* mpcentral's "one AWS tenant per client" model, since SV360's customers are small businesses who don't want an AWS bill.

**Decision: option 2.** Two reasons the micro-app model doesn't fit the core product, independent of the distribution question in §7 above:

- **Shape mismatch.** A micro-app is a prompt + buttons + output-renderer config (Markdown/Mermaid, "structured JSON fields later") — a content-generation shape. SV360 needs a real system of record: a customer master, an order/inventory-event ledger, scheduled weekly reconciliation, AR aging over time. That's a different kind of application, not a prompt template.
- **Data ownership.** SV360's data is financial PII (bank transactions, Square invoices, customer payment history) that a small business is trusting SV360 with. That data belongs in SV360-controlled storage — not inside ThoughtBox's shared multi-tenant schema, which is scoped for storage/email/contacts *pass-through*, not for owning business-critical content. It does **not** follow that SV360 needs its own database — see §7.2.

### 7.2 Storage model: thin compute, not a system of record

An earlier draft of this spec implied SV360 needed "a real system of record" with its own relational database. That overstated it, and it isn't supported by ThoughtBox's own architecture: `ARCHITECTURE.md` explicitly designs the customer plane to need **no relational database** — "conversation history, activity logs, file metadata, and a user identity record... none of this requires a relational database... a customer who needs no conversation persistence can run fully stateless."

The corrected model:

- SV360 reads from connected sources (Drive/Gmail/Square/bank) on each run, computes the reconciliation in memory, and writes output back as **files** — the customer master, order ledger, and weekly artifact are structured files (JSON + a human-readable spreadsheet/PDF/Markdown), not database rows.
- "Back to storage" means either ThoughtBox-managed storage (the existing `thoughtbox` S3 provider) or the user's own connected Drive/Dropbox, per user preference — both already-built ThoughtBox primitives, no new platform work.
- Cross-run comparability (AR aging, week-over-week variance — genuinely needed, per §1's lessons docs) comes from reading back prior **dated snapshot files**, not from querying a database. This is the exact pattern already running for Anna Bell (`Weekly_Data_Contract_Jul13_2026.json`).
- This matches Anna Bell's own stated roadmap, not just a preference: Phase 1 is "spreadsheet → structured workbook"; a real backing data model ("workbook demoted to a view over a proper data model") is explicitly a **Phase 3, post-online-launch** concern — out of scope for MVP.
- The only irreducible state is a thin user-identity/session layer (which SV360 user owns which linked accounts) — the same minimal footprint any multi-user app needs, and one ThoughtBox's own docs already scope to DynamoDB/S3, no Postgres.

**How it maps onto the existing architecture:** SV360 is, in ThoughtBox's own terms, a single **Customer Plane** deployment — the standard reusable customer-plane role (own frontend, own backend, `MPC_CENTRAL_BASE_URL` pointed at ThoughtBox central) already defined in `ARCHITECTURE.md`'s split-plane model. SV360 registers once as one tenant; every small-business owner (Anna Bell and everyone after) is a **user** inside that one tenant, linking their own Drive/Gmail/Square/bank accounts through the standard OAuth flow. This is not the AWS Marketplace CDK Quick-Launch path mpcentral's own customers use — that path exists because mpcentral's customers are enterprises who want their own AWS account; SV360's customers explicitly don't.

The ThoughtBox-hosted micro-app model isn't wasted thinking — it's the right shape for a *discovery/teaser* surface now (a lightweight "check your capital readiness" entry point on `thoughtbox.app` that deep-links into `seedvault360.com`, or eventually an MCP-UI/App per the note in `PLATFORM.md`), and it's not where the core product lives *today*. That could change: `PLATFORM.md`'s "App Tiers" note describes a planned heavier hosted tier (scheduled execution, real compute, isolated per-app data) that SV360 is the natural reference implementation for. Building standalone now doesn't preclude migrating onto that tier later — it's how that tier is supposed to get designed, per the platform's own build-from-real-apps principle. Log SV360's pipeline steps (spreadsheet normalization, channel P&L construction, batch/yield optimization, cash-gap calculation) under `PLATFORM.md`'s "Pipeline Step Origin Notes" as they're built.

---

### 7.3 Micro-apps vs. the core app — where each actually fits

"Thin" (§7.2, no database) is not the same as "micro-app shaped" — those are different axes. The core reconciliation engine still isn't a micro-app, for reasons unrelated to storage:

1. **Multi-connector orchestration** — one run touches Drive/Gmail/Square/bank and cross-reconciles them, plus reads back prior snapshots. A micro-app is one prompt call with interpolated inputs, not a pipeline.
2. **Deterministic calculation** — batch/yield optimization, cash-gap arithmetic, and the three-tier revenue rule need to run the same way every time as code, not be re-derived by an LLM per invocation.
3. **Recurring, not button-triggered** — the core value is a scheduled weekly job.
4. **Durable per-user linked-account state** — which Square/Drive/bank accounts belong to which user has to persist across weeks; a micro-app's inputs are ephemeral.

That said, a real slice of the lessons content genuinely is micro-app shaped — single-shot, form-in/document-out, no external data connection required — and should ship as first-party ThoughtBox micro-apps independent of the core app's timeline:

- **Capital Strategy Advisor** — consolidates two previously-separate candidates into one guided flow, since they're naturally sequential rather than disconnected: diagnose (liquidity vs. leverage vs. viability, via the "five questions before you take money") → size the ask (the 3–5× survival-number heuristic, not the bare minimum) → check vehicle eligibility (CDFI referral gates, credit-file hygiene, MCA-stacking and personal-vs-entity tax-strategy traps). Answers "how much should I raise, what do my finances actually support, what's the right vehicle" — a different question from Tool #1's "what's currently true," and deliberately kept separate from it for that reason. Should accept manually-entered numbers standalone, but is a natural consumer of Tool #1's output (real contribution margin, real cash position) once that exists, rather than asking the founder to estimate.
- Wholesale-placement pitch generator (floor price + buyback + trial-window structure, from Lesson 001)
- Future-self test → written decision memo
- Voice-profile setup, saved to memory for later drafting

**MCP-UI/Apps as an additional interface, not a competing decision.** Once the thin backend (§7.2) exists, its core actions (`run_reconciliation`, `get_latest_artifact`) can also be exposed as MCP tools with the artifact rendered via MCP-UI — same backend, same data, second interface, the same "one logic, two delivery surfaces" pattern already noted in `PLATFORM.md`. For a Cowork-native user like Kevin this is arguably more natural than the web dashboard. Keep the web URL as the default for a non-technical SMB customer without a chat client configured; build the MCP surface as an addition, not a replacement.

---

## 8. Open items

- [ ] Register a Square OAuth app (ThoughtBox-side infra step, blocks §4)
- [x] SV360's tenant shape on ThoughtBox — resolved in §7.1: one SV360-operated Customer Plane deployment on `seedvault360.com`, many end-users, not per-customer AWS deployment
- [ ] Pick a frontend stack for `seedvault360.com` (Next/Astro/etc. — framework choice doesn't block anything above)
- [ ] Decide the first artifact template (fields, layout) — draft against Anna Bell's actual Hyatt/farmers-market data as the fixture
- [ ] Revisit local-file-access recommendation if a non-Kevin customer can't self-serve it
- [ ] Build the first content micro-app (CDFI checklist is the smallest, most self-contained candidate) as a parallel track — doesn't block the core app
- [ ] Expose core actions (`run_reconciliation`, `get_latest_artifact`) as MCP tools + MCP-UI rendering once the thin backend exists, so it's usable inside Cowork/Claude Desktop, not only the web dashboard
- [ ] Confirm whether ThoughtBox's Drive connector can request folder-scoped write access (e.g. Google's `drive.file` scope, limited to files/folders the user explicitly picks or the app creates) rather than full-Drive access — needed so a future SV360 customer's output can land in a folder *they* see and manage under *their own* consent, without Kevin's login being in the loop. Not needed for Anna Bell today (Kevin owns both ends); becomes necessary at the first non-Kevin customer. Validated end-to-end for Kevin on July 16: Square direct + ThoughtBox for Drive/Plaid + saved output, all in one artifact.

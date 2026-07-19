# SeedVault360 — Tool #1: AR / Receivables Reconciliation & Aging Check

**Status:** v1, manual pipeline — no new infrastructure
**Companion doc:** `seedvault/docs/SeedVault360_MVP_Spec.md`
**Skill file:** `seedvault/skills/ar-reconciliation/SKILL.md`

---

## 1. Why this tool, first

Narrowest slice of the underwriting-artifact MVP that's still independently valuable, and it extends something already proven rather than inventing from zero — the Fable5 usage study documents a "Daily Square receivables check" already running for Kevin, which already caught real findings (a ~21% Square Funding payout skim, an aged retailer receivable). The addendum lessons doc calls this exact pattern "the SV360 demo in miniature." Counterparty payment history is also one of the four inputs the full artifact needs (order book + payment history + unit economics + cash-gap), so this isn't a detour — it's the first quarter of the thing.

## 2. What "done" looks like for v1

A person runs a documented skill inside a ThoughtBox-connected chat session (Claude.ai, Cowork, or Claude Code with the ThoughtBox MCP connector active). It reconciles bank deposits, Square invoices, and the workbook's own stated AR against each other, flags anything that doesn't tie out, tiers the result honestly, and writes a dated snapshot artifact. No app, no server, no scheduling — the human is the trigger for now.

## 3. Inputs

| Source | Access today | Notes |
|---|---|---|
| Bank transactions | `list_bank_accounts` / `list_transactions` (Plaid, live now) | Net-of-fees deposits — the reconciliation *ground truth* for "did money actually arrive" |
| Square invoices/payments | **Square's own official MCP server** (`github.com/square/square-mcp-server`, hosted at `mcp.squareup.com`, OAuth), connected alongside ThoughtBox in the same Claude session — falls back to manual export/paste if not connected | No ThoughtBox-side Square connector needed for this to work today. ThoughtBox's own connector (`ARCHITECTURE.md` §"Payments & POS") is still worth building later for a unified onboarding flow once SV360 has non-technical customers who shouldn't have to configure two separate connectors themselves — but it's no longer a blocker for Kevin's own use, and this is a good way to validate whether Square data is as valuable as assumed before investing in that build |
| The workbook's own AR figures | `read_file` against the connected Drive/Dropbox file | Anna Bell's in-progress Excel migration customer master / revenue-AR view |
| Counterparty email threads (optional) | Gmail via ThoughtBox, if a payment status needs chasing | Only when the above three don't resolve a discrepancy |

## 4. The reconciliation logic

1. Pull trailing-N-days bank transactions.
2. Pull Square invoice/payment data for the same window.
3. Read the workbook's stated AR for the same counterparties.
4. **Tie out all three.** Never assume one is authoritative. Specifically watch for:
   - **The double-count trap** — a distributor payment logged in both the POS/workbook *and* the bank feed inflates revenue if summed instead of matched.
   - **The fee-skim trap** — Square Funding (and similar) withholds a cut at payout; an invoice's face value won't match the bank deposit, and that gap is not "missing money," it's a known, expected fee — don't flag it as aging, but don't drop it silently either. Log it as a fee line, not a discrepancy.
   - **Anything that doesn't reconcile after those two checks is a real gap.** Flag it in the output. Never silently pick a number that hides it.
5. **Tier the result, never collapse it:**
   - **Collected** — matched to an actual bank deposit.
   - **Invoiced, aging** — a real invoice with no matching deposit yet; report days outstanding per counterparty.
   - **Uncertain/unconfirmed** — anything that couldn't be matched to a Square record at all.
6. Write the dated snapshot artifact (`create_file`), optionally emailed (`send_email`).

## 5. Output

A short, dated Markdown/PDF artifact: total collected, total aging (by counterparty, oldest first), anything uncertain, and every flagged discrepancy with a one-line explanation — not just a clean-looking number. Stored under a fixed naming convention so weekly runs are comparable (`SeedVault360/AR_Snapshot_<business>_<date>.md`).

## 6. Making this reusable, not just Kevin's script

The skill file keeps business-specific values — workbook file ID, bank account ID, aging threshold, business name — as named parameters at the top, not hardcoded in the procedure. Pointing this at a second business is "fill in different parameters," not "rewrite the logic." Same config-vs-code discipline the micro-apps model already uses, applied to a skill instead of a hosted app.

## 7. Next-iteration candidates (don't build preemptively — let friction pick)

- **Square connector on ThoughtBox** (`thoughtbox/docs/ARCHITECTURE.md` §"Payments & POS") — no longer blocking, since Square's own official MCP server can sit alongside ThoughtBox in Kevin's own Claude session today. Revisit once SV360 has non-technical customers who need one unified onboarding flow rather than configuring two separate connectors themselves.
- **Scheduling** — removes "someone has to remember to trigger it." Only matters once the manual trigger is itself the bottleneck, not before.
- **Extend to the fuller artifact** — channel P&L, unit economics, cash-gap — once AR reconciliation is solid and boring to run.

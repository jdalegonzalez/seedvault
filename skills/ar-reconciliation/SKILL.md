---
name: ar-reconciliation
description: Reconcile bank deposits, Square invoices, and a business's own workbook AR figures into a tiered, dated receivables snapshot. Use when asked to run a SeedVault360 receivables/AR check, a weekly cash/collections review, or to check which invoices are aging/overdue for a connected small business.
---

# AR / Receivables Reconciliation & Aging Check

Reconciles three sources of truth — bank deposits, Square invoices, and a business's own workbook — and produces one honest, tiered snapshot of where cash actually stands. Never collapse the tiers into a single number; the gaps are the point, not noise to clean up.

Design rationale and next-iteration plan: `seedvault/docs/SeedVault360_Tool1_AR_Reconciliation.md`.

## Configuration (fill in per business before running)

```
BUSINESS_NAME:        Anna Bell Mac & Cheese
WORKBOOK_FILE_ID:     <Drive/Dropbox file ID for the structured customer-master workbook>
WORKBOOK_AR_TAB:      <tab/section name holding the revenue/AR view — do not default to the whole file>
BANK_ACCOUNT_ID:      <ThoughtBox-connected bank account id, from list_bank_accounts>
LOOKBACK_DAYS:        30
AGING_FLAG_DAYS:      14      # invoices older than this with no matching deposit get flagged
```

If any of these are unknown, ask the user before proceeding rather than guessing. In particular, confirm `WORKBOOK_FILE_ID` points at the current structured workbook (customer master / weekly orders ledger / revenue-AR view), not any legacy spreadsheet that predates it — the whole point of this check is to catch what the old file was shown to hide (a channel's revenue silently omitted, stale cached values, undocumented unit conventions). If the AR view tab isn't fully populated yet, fall back to the weekly orders ledger filtered to unpaid orders, and say so explicitly in the output rather than presenting it as equivalent.

## Procedure

1. **Load prior state, if any.** Call `recall_memories` for this business — a prior run's open aging items, so this run can report what's newly resolved vs. still open, not just a fresh list every time.

2. **Pull bank transactions.** Call `list_transactions` for `BANK_ACCOUNT_ID` over the trailing `LOOKBACK_DAYS`. This is the ground truth for "did money actually arrive" — net of processor fees.

3. **Pull Square data.** No ThoughtBox Square connector exists yet, but a separate, official Square MCP server may be connected in this same session (`mcp.squareup.com` — see Square's own developer docs). Check for it first:
   - **If a Square-connected tool is available**, use it directly to pull invoices/payments for the same window. Note in the output that Square data came from Square's own MCP server, not ThoughtBox.
   - **If not connected**, ask the user to paste or upload a Square export (invoices + payments) for the same window, or point to wherever their existing process already gets this.
   - Either way, don't fabricate or estimate Square data if it truly isn't available — say so explicitly in the output instead.

4. **Read the workbook's own AR figures.** Call `read_file` on `WORKBOOK_FILE_ID`. Pull whatever the workbook currently claims for outstanding receivables, by counterparty.

5. **Reconcile all three sources.** For each invoice/counterparty:
   - Try to match it to a bank deposit. A face-value mismatch is *expected* if a payment processor withholds a fee at payout (e.g., Square Funding) — treat that gap as a **fee line**, not a discrepancy, and note the effective fee rate if it's unusual.
   - Watch for the **double-count trap**: the same payment logged once in the workbook and once in the bank feed is not two dollars, it's one. Never sum without matching first.
   - Anything that still doesn't reconcile after the above two checks is a **real gap** — keep it, flag it, don't silently resolve it to a clean-looking number.

6. **Tier the result. Do not collapse tiers into one total:**
   - **Collected** — matched to an actual bank deposit.
   - **Invoiced, aging** — real invoice, no matching deposit, older than `AGING_FLAG_DAYS`. Report per counterparty, oldest first, with days outstanding.
   - **Uncertain** — anything that couldn't be matched to a Square record at all.

7. **Write the output artifact.** Call `create_file` with the content below, path `SeedVault360/AR_Snapshot_<BUSINESS_NAME>_<today's date>.md`. If the user wants it sent, call `send_email` with the same content as a plain-language summary.

8. **Save state.** Call `save_memory` with today's date and the current list of open aging items, so the next run can report deltas.

## Output template

```markdown
# AR Snapshot — <BUSINESS_NAME> — <date>

## Collected (trailing <LOOKBACK_DAYS> days)
$<amount> across <N> matched deposits.

## Aging (invoiced, no matching deposit, > <AGING_FLAG_DAYS> days)
| Counterparty | Invoice amount | Days outstanding | Notes |
|---|---|---|---|
| ... | ... | ... | ... |

## Uncertain (couldn't match to a Square record)
| Item | Amount | Why it's uncertain |
|---|---|---|
| ... | ... | ... |

## Flagged discrepancies
- <plain-language description of anything that didn't reconcile and why>

## Since last run
- Resolved: <items that were aging last time, now collected>
- Still open: <items still aging, with updated days-outstanding>
- New: <items that appeared this run>
```

## Guardrails

- Never sum Collected + Aging + Uncertain into one headline dollar figure. The three-tier split is the deliverable, not a step toward one.
- If Square data wasn't provided, say so explicitly in the output — don't proceed as if it were complete.
- If a number looks too clean (a fee-adjusted deposit that matches an invoice exactly to the cent, an aging list with nothing overdue two weeks running), treat that as a reason to double-check the pull, not a reason to relax.

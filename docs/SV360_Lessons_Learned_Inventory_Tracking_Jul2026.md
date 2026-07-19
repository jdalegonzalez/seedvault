# SeedVault360 Lessons Learned — Inventory Tracking & Stakeholder Sharing (July 14, 2026)

**From:** Kevin Mobley
**For:** Dale Gonzales
**Context:** Anna Bell Mac & Cheese needed a fast, defensible freezer-inventory estimate the day after the Saturday farmers market — before a physical photo count could be done — and needed to share it with an outside advisor (Chris Koomey). We built it by pulling Square sales, applying the founder's reported real-world events, valuing the result at normal selling prices, and producing a PDF + Markdown report plus an emailed copy. This is a second live instance of the exact "make operational reality legible to a stakeholder" problem SV360 exists to solve.

## The setting is the market we're building for

A small producer's inventory truth lives in three disconnected places at once: the POS (Square, which only sees card sales), the founder's head (cash sales, tastings, samples, deliveries that never touch the POS), and the freezer itself (the only ground truth, countable only by physically looking). No single system knows the answer. Any capital-readiness or operations product for this market has to *reconcile across* these sources, not assume one of them is authoritative.

## Lesson 1: The POS captures only part of the truth — model the leakage explicitly

Square recorded card sales cleanly (frozen pans by size, hot cups, $1 bites). But ~20% of farmers-market revenue is unrecorded cash, and several inventory-depleting events (tasting pans consumed, cups baked, pans pulled for a chef meeting, hotel deliveries, product samples) never appear in the POS at all. A naive "starting inventory minus Square sales" would have been materially wrong. **SV360 implication:** an inventory/AR module must have first-class fields for off-POS events — cash-sales percentage, samples, tastings, direct deliveries, spoilage — and should *prompt* the founder for them rather than silently assuming the POS is complete. The prompts themselves become a data-collection habit that improves lender-readiness over time.

## Lesson 2: Ask before you assume — a few structured questions replace hours of bad guessing

Four clarifying questions (baseline source, how "shaved ice" relates to frozen mocktail stock, how many cash pans, what production to include) removed every material ambiguity before a single number was written. Each had a sensible default, so the founder answered in seconds. **SV360 implication:** the reconciliation flow should be a short structured questionnaire with smart defaults, not a blank spreadsheet. This is faster for the user *and* produces a documented assumption trail a lender can audit — the "why is this number what it is" that underwriting always asks for.

## Lesson 3: Surface reconciliation gaps, never bury them

The documented baseline (45 Hyatt pans on Jul 9) could not be reconciled with a known event (65 pans delivered) — the baseline had understated stock. The right move was to floor the number at zero and **flag the discrepancy in the report**, not to silently pick a number that hides it. **SV360 implication:** control totals and visible variance flags must be a native feature. A tool that quietly reconciles to a clean-looking number destroys exactly the trust that lenders and advisors are extending. Show the gap, show the assumption, let the human true it up.

## Lesson 4: Separate "cash" from "value at normal prices" — the three-tier discipline again

The combined inventory valued out to ~$5,575 at normal selling prices, but only $810 of that (a committed, invoiced Hyatt order) is a real receivable; the rest is speculative inventory that is only worth that much *if it sells* at typical rates through PRFM and wholesale. The report presents these separately and never sums them into a single "you have $5,575" headline. **SV360 implication:** any dashboard that turns inventory into a dollar figure must tier it — committed/invoiced vs. market-target vs. speculative inventory — or it will systematically overstate a business's position and set up both founder and lender for disappointment. This is the same rule that governs the revenue reporting; it should be a platform-wide invariant.

## Lesson 5: The deliverable is a shareable artifact, produced in one pass

The output was not a chat answer — it was a styled PDF plus a Markdown source, saved to the company's dated folder structure, and an email draft to an external advisor with a plain-language summary. That artifact is what a founder actually forwards to a lender, advisor, or hotel buyer. **SV360 implication:** the unit of value is the *shareable, stakeholder-ready document*, generated automatically from the same reconciliation, with the assumptions and flags attached. Templatize it (report + control totals + assumption log + one-line summary) so every weekly run yields something a founder can send without editing. Reusability matters: this workflow was captured as a repeatable weekly skill so it runs the same way every week and the outputs stay comparable over time — comparability across weeks is itself a capital-readiness signal.

## One-line takeaway for the platform

**Inventory is a reconciliation problem across POS + founder memory + physical count; the product's job is to ask the right off-POS questions, tier the dollar value honestly, flag every gap it can't close, and emit a stakeholder-ready artifact — the same document that makes a $10K facility underwritable.**

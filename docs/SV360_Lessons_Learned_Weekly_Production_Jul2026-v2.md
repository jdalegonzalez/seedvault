# SeedVault360 Lessons Learned — Anna Bell Weekly Production Run (July 13, 2026)

**From:** Kevin Mobley
**For:** Dale Gonzales
**Context:** This week Anna Bell Mac & Cheese planned production for its largest standing hotel order — 200 ten-ounce pans for Hyatt (135 new after netting freezer stock) — plus farmers market and wholesale inventory, using an AI operating assistant working against the company's Numbers spreadsheet. The run was then independently audited by two other AI models. What follows is what the exercise taught us about the friction SeedVault360 exists to remove, and what it implies for the platform.

## The setting is the market we're building for

Anna Bell is a real instance of the SeedVault360 customer: a premium small producer whose growth engine is hospitality (Hyatt, US Foods), operating on a roughly $5K cash runway, with the founder personally doing sales, ops, and product development. The entire production planning system is a hand-built spreadsheet — sixteen interlinked tabs covering demand by channel, batch math, ingredient ordering, packaging, and cash projection. It works, but only because the founder carries the model's undocumented rules in his head. Every lesson below generalizes to thousands of small producers trying to sell into hotels and food service.

## Lesson 1: The operational data lenders need is trapped in fragile spreadsheets

The run's math came out correct, but only after reverse-engineering the workbook's hidden conventions: a column labeled "Individual" that actually means two-cup boxes, a netting tab holding month-old freezer counts, hard-coded cells that formulas silently depend on, and a file format (Apple Numbers) that cannot recalculate outside the app — so programmatically written values sit next to stale cached results until a human opens the file. An auditor flagged exactly that as the material risk. For SV360 the implication is direct: any capital-readiness product must assume the source of truth is a spreadsheet with undocumented semantics, and the first product motion is ingestion and normalization, not a request that the founder re-enter data into our forms.

## Lesson 2: The growth channel was financially invisible

The most striking finding of the audit response: the workbook's revenue formula for Hyatt omits the ten-ounce pan column entirely. The company's primary growth channel — the reason for this week's largest-ever production run — shows $0 revenue in its own operating model, and no unit price or payment terms are recorded anywhere. Similarly, hot-cup and sample revenue at the farmers market never reaches the revenue total. A lender or program underwriting a $10K facility would look at this model and be unable to see the very traction that justifies the loan. SV360's opportunity: automatically construct a clean channel-level P&L from ops data, because the founder's spreadsheet almost certainly understates the business.

## Lesson 3: Working capital timing is the product

This week required buying roughly $760 of ingredients (7 gallons cream, 5 gallons milk, 70 pounds of cheese, 40 pounds of noodles) plus packaging and labor, all in advance of a hotel receivable with unknown payment terms, against a $5K runway. That gap — produce now, get paid on hotel terms later — is precisely the $10K-threshold problem SV360 is solving. Lesson: the platform should compute this gap automatically from the weekly production plan (POs out, receivables in, terms applied) so a founder can show a lender the exact size, timing, and purpose of the need. This week's run produced a machine-readable data contract (JSON with inventory events, purchase orders, COGS, expected revenue by channel, and a cash-flow flag) as a prototype of that artifact.

## Lesson 4: Whole-batch optimization is universal and valuable

Small-batch producers can't make 7.47 batches; they make 8 and must decide what to do with the slack. This week the assistant padded freezer inventory (+7 two-pound pans, +1 cup box) to fill the eighth batch to within 0.5 oz of capacity, turning would-be waste into sellable wholesale stock aimed at named retailers. Both auditors confirmed the fit was mathematically optimal. This is a feature, not a consulting engagement: given SKU recipes and a batch size, integer-batch optimization with configurable padding priority (closest fit vs. highest sell-through) is generic across producers and directly improves gross margin.

## Lesson 5: Verification gates beat trust

The multi-model audit loop worked. Independent reviewers reproduced every number, caught the stale-cache risk, and pushed the process toward explicit controls: dated snapshots before clearing data, human-in-the-loop recalculation checks, and cross-validation of order quantities against the workbook's own rounding logic. SV360 should bake this in — every automated plan ships with a verification checklist and control totals, because our users are betting payroll on these numbers and our lenders are betting capital on them.

## What this means for the SV360 build

Near-term, the platform's minimum loop looks like this: ingest the producer's existing spreadsheet however messy; normalize SKUs, units, and channels (the cup-vs-box trap is the norm, not the exception); generate the weekly production plan with integer-batch optimization; emit standardized inventory and financial events; and assemble the capital-readiness picture — channel P&L, unit economics, and the working-capital gap with timing. Each week of Anna Bell operations is now producing these artifacts (run log, data contract JSON, validation records) that can serve as the reference dataset and fixture library for the first build. The Hyatt pricing gap and the Numbers recalculation limitation are both open items on the Anna Bell side; resolving them will generate more useful schema, and I'll keep forwarding the weekly artifacts as they accumulate.

**Artifacts referenced** (in `Anna Bell Mac and Cheese/Farmers Market/2026/July 2026/`): `Production_Run_Log_Jul13_2026.md`, `Weekly_Data_Contract_Jul13_2026.json`, `validation/` folder (two independent audits plus response), and the `weekly-mac-production` skill package.

---

## Addendum (July 14, 2026): Customer & Expansion Roadmap — and what it means for the SV360 product

Since the original write-up, the Hyatt picture sharpened and Anna Bell began its migration off the Numbers workbook. Both developments map directly onto the platform.

### What changed at Anna Bell this week

The 200-pan order resolved to Hyatt Regency Atlanta at $6/pan ($7 is the standard 10 oz price everywhere else — HRA's discount trades against a free kitchen, a barter term no spreadsheet cell can express but an underwriter should see). Both invoices ($390 delivered + $810 in production) are live in Square, and connecting Square and Gmail to the AI assistant immediately produced two findings a founder juggling production week wouldn't have chased down: a retail partner sitting on $504 of overdue invoices (24 days on the oldest), and confirmation that another retailer needs no restock this week — one finding protects cash, the other prevents overproduction. That is the SV360 demo in miniature: connect the systems the founder already uses and the working-capital picture assembles itself.

### The customer model that fell out of the migration

The Excel migration (v1 shipped July 14) is organized around a **customer master**, and its columns are the schema SV360 needs, because every one of them was forced by a real complication: **channel** (hospitality / distributor / retail / market / D2C); **order source** (text, email, formal PO — Anna Bell takes orders five different ways); **delivery method** (founder-delivered local, distributor like US Foods, direct ship — Hyatt alone uses all three depending on the property); **price tier per SKU** (HRA $6 vs. standard $7, retail vs. wholesale); **payment terms as observed, not stated** (Square history shows who pays same-day and who runs 24 days late); and **the system-of-record ID** (Square customer ID) so receivables reconcile automatically.

The expansion insight: a "customer" is not a brand, it's a property-plus-buyer-plus-delivery-path. "Hyatt" at Anna Bell is four different rows — HRA (Hunter Keels, direct, $6), Grand Hyatt (Bradley Dixon, direct, $7), Seattle (via US Foods, who is the actual customer of record), Denver (direct ship). Any small producer scaling into hospitality will hit this same fan-out around order five, and their spreadsheet will break exactly the way Anna Bell's did.

### Roadmap Anna Bell is executing (= SV360's product sequence)

Phase 1, now: spreadsheet → structured workbook with customer master, weekly orders ledger, batch engine, and revenue/AR view; every number recalculable and verifiable by machine. Phase 2, before fall: order intake normalization — email POs and retailer emails parsed automatically, text orders captured, all landing in one ledger; Square reconciliation of invoices against expected payments, with overdue flags. Phase 3, fall (online launch): real-time inventory decrement and the workbook demoted to a view over a proper data model; weekly cash projection tied to production plan, POs, and receivables timing. Each phase at Anna Bell produces schemas, fixtures, and failure cases Dale can build against — the platform is being specified by operating it manually first.

### The capital-access tie-in

The receivables finding is the sharpest argument yet for the $10K thesis: this producer's cash position this week is determined less by sales than by collection timing — $1,200 committed but unpaid from the growth account, $504 silently aging at a retailer. A platform that shows a lender "here is the order book, here is the production cost, here is the collection history by counterparty" turns an unbankable P&L into an underwritable cash-flow story.

### Case in point: a real decline, this month (anonymized)

In the same window as this production run, a small-business lender reviewed a working-capital application from a producer in our space and declined it for "insufficient income" — the year-to-date P&L showed roughly $1,600 of net income, and the bank statements read thin. What the P&L couldn't show the underwriter: a standing order from a national hotel brand's flagship property with two live invoices totaling $1,200 and a buyer with a consistent ~1-week payment history; a wholesale roster of a dozen retailers, most of whom pay same-day to two-day (verifiable in the payment processor's records); and a production system that converts a confirmed order into ingredient cost, margin, and delivery date within minutes. The decline wasn't a judgment about the business — it was a data-format failure. The information that would have flipped the decision existed in Square, in email threads, and in a spreadsheet, but no underwriting process could ingest it. SV360's first product is exactly that translation layer: order book + counterparty payment history + unit economics, assembled automatically from the systems the founder already uses, into the artifact a lender can actually underwrite. This is not a hypothetical customer story. This is the gap, observed firsthand, in July 2026.

# SeedVault360 — Consolidated Reference

**Compiled by:** Claude, for Kevin Mobley
**Source scope:** This document pulls together **every SeedVault360 reference found in this one project** — its memory and all of its chats. It does **not** include content from other project folders or from your local Cowork directory (see "Coverage & Gaps" at the end).
**Generated:** July 13, 2026

---

## 1. What SeedVault360 is

- A venture Kevin is building with **Dale Gonzales** — a long-time friend and collaborator (LinkedIn: https://www.linkedin.com/in/jdalegonzalez/).
- Website: **https://seedvault360.com**
- **Objective:** build a platform that removes the friction for small businesses operating in the **hospitality industry**.
- **Method:** take the lessons learned from Kevin's direct experience with **Anna Bell Mac** and **Ice To Meet You**, and leverage that knowledge to help other small businesses succeed in hospitality.
- **First concrete goal / threshold:** enable a small business to secure **capital — $10K is the first threshold.**
- **Stage:** concept-stage capital-readiness platform.
- **Priority in Kevin's portfolio:** Anna Bell Mac LLC and ITg-Northamerica are primary; **SeedVault360 is worked on as time permits.**
- **Kevin's stated intent:** capture the lessons learned from his Claude projects and **feed those lessons to Dale** as they build SeedVault360.

---

## 2. Core thesis — capital readiness starts with clean books

SeedVault360's first threshold is getting a small business to **$10K in secured capital**, and capital readiness starts with clean books. The reconciliation work done for Anna Bell surfaced a set of lessons that generalize to any small hospitality business trying to become fundable:

- **Multi-channel revenue rarely lands in one system.** A farmers-market vendor's card sales, cash, and ACH from a distributor live in three different places. Any capital-readiness tool has to reconcile *across* payment rails — it can't assume one processor is the ground truth.

- **The double-count trap is the default failure mode.** When a business logs a distributor payment both in its POS (for tracking) *and* sees it hit the bank, revenue inflates. The platform should reconcile to **actual bank deposits**, with a variance check that forces the question.

- **The expense side is where small businesses go dark.** Inflows are visible because the payment processor shows them; outflows are scattered across receipts. The gap between "money in" visibility and "money out" visibility is exactly what makes a business *look* fundable when it isn't. **Closing that gap is the product.**

- **Runway is the number both lenders and the founder actually need.** Not revenue, not gross margin — **months of cash left at current burn.** Make it the headline output.

- **One immutable record per month beats a living spreadsheet.** The failure that started this whole discipline was a spreadsheet edited into oblivion mid-month. **Versioned, locked monthly closes** are a feature worth building in from day one.

---

## 3. Additional friction points worth logging

- **The warm intro to a corporate buyer is itself the friction.** When Jay Bailey offered to connect Kevin to a Hyatt corporate contact, that warm handoff — the thing that gets a small vendor in front of a large hospitality buyer — is precisely the friction SeedVault360 aims to remove. Worth capturing as a lesson: access to buyers is gated by relationships, not product quality.

- **Unit economics as investment-readiness.** Knowing your true fully-loaded unit cost (e.g., margin per pan of mac and cheese) is what makes a founder look investment-ready on the spot. Capital-readiness tooling should make that number easy to produce and defend — it's what programs like RICE screen for.

---

## 4. Tooling relevant to SeedVault360 development

- **Builder / Claude Code (the "Level 5" step from the workflow-maturity video).** Building actual software agents is *not* the right use of time for Anna Bell during the cash crunch — but it **is** genuinely relevant for ITg-Northamerica and SeedVault360, which are development efforts.

- **GStack** (`garrytan/gstack` on GitHub — open-source Claude Code skill pack, 23 slash-command tools, MIT licensed):
  - Installs into **Claude Code on the local machine** (`~/.claude/skills/gstack`), not from the claude.ai chat interface.
  - Aimed at software-shipping and product-leadership workflows — so it fits **ITg-Northamerica and eventually SeedVault360**, not the Anna Bell financial/ops side.
  - The `/office-hours` and `/plan-ceo-review` skills in particular may be useful for **pressure-testing the SeedVault360 concept before writing code.**
  - Two cautions Kevin should opt into knowingly: the setup runs third-party code on his machine, and it modifies `CLAUDE.md` to route all web browsing through GStack's own `/browse` skill (disabling the built-in Chrome tools).

---

## 5. The lessons-log workflow (Anna Bell → Dale)

- A recurring theme across chats: a **running lessons log** that Kevin can hand to Dale for SeedVault360. It was identified as a lighter, "when you have time" build that sits alongside the core Anna Bell cash-flow and unit-economics work.
- The **Reconciliation Handover doc** (`AnnaBell_Reconciliation_Handover.md`) was explicitly built as a two-audience document: Section 3 is the standing monthly-close SOP for Kevin/Claude, and **Section 6 is the transferable version for Dale / SeedVault360** (the source of the lessons in Section 2 above).
- This consolidated file is, in effect, that lessons log for the SeedVault360 slice of this project.

---

## 6. Coverage & gaps — what this file does NOT include

This file was generated from **one project only.** The following were not reachable and should be captured separately:

- **Other project folders.** Memory and chat search are scoped per-project. Any SeedVault360 content in the ITg-Northamerica project, a dedicated SeedVault360 project, or elsewhere is not here. *Workaround: run the same compile prompt inside each project folder and merge the outputs.*
- **Local Cowork directory.** Files on Kevin's hard drive (production runs, Square exports, any SeedVault360 notes stored locally) can't be read from a claude.ai chat session. *Workaround: run this inside the Cowork desktop app pointed at that directory.*

---

*End of consolidated reference.*

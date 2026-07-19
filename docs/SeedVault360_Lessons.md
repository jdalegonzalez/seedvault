# SeedVault360 — Lessons Learned Log

Captured from Kevin Mobley's experience running Anna Bell's Mac & Cheese / Ice To Meet You, for Dale Gonzales and the SeedVault360 platform build.

---

## Lesson 001 — Wholesale pricing structure for new hospitality/retail placements
**Date:** July 2026
**Context:** Negotiating placement of Ice To Meet You (Italian ice) at Flaky Not Flaky, a local Atlanta café, with owners Miguel & Anna.

**The situation:**
The retailer was hesitant to commit to a suggested $9–11 retail price point for a 7oz product, worried it would be too high for guests expecting quick breakfast/lunch items. Retailer also raised visibility/merchandising concerns (freezer placement, sampling, staff engagement) as being just as important as price.

**The approach that worked:**
- **Wholesale price held firm** ($5.50) — vendor doesn't discount to make the retailer's price point work.
- **Retail price control handed to retailer.** Let the retailer set the price they believe will sell in their specific environment — they know their guest base and price sensitivity better than the vendor does. Framed as a "normal operating mode with partners," not a one-off concession.
- **Buyback offer on unsold product.** Removes retailer's inventory risk entirely, which unlocks their willingness to try something outside their guests' normal expectations (Italian ice at a bakery/coffee spot).
- **Vendor invests in display equipment** (freezer) rather than asking retailer to carry that capital cost — increases retailer buy-in with zero equipment risk on their side.
- **Defined trial window (60–90 days)** proposed alongside the buyback, specifically to protect the vendor's equipment investment from an open-ended buyback obligation. Without a trial window, a generous buyback + owned equipment could leave the vendor holding sunk capital with no clear reassessment point.

**Reusable principle for SeedVault360:**
When a small food/beverage brand is trying to get into a hospitality account that's price-sensitive to their product, a "wholesale floor + retailer-set retail price + buyback + vendor-owned equipment + defined trial period" structure can de-risk the trial for the retailer enough to say yes, while protecting the vendor's margin and capital outlay. The trial window is the piece founders are most likely to forget — pair any buyback/equipment investment with an explicit reassessment date.

**Tags:** pricing, wholesale, hospitality placement, retailer negotiation, buyback, risk-sharing

---

## Lesson 002 — Voice authenticity matters when using AI to write partner-facing emails
**Date:** July 2026
**Context:** Same Flaky Not Flaky email thread — drafting a response with Claude, then revising through several rounds.

**The situation:**
Claude's first draft was accurate and well-organized, but it read as generic business correspondence — the kind of email you'd send to any vendor. Kevin knows Miguel & Anna personally, and the relationship (plus the fact that everyone involved is a Southerner) calls for warmer, more familiar language than a first-pass AI draft naturally produces. Kevin had to go through multiple rounds of edits to loosen the tone: adding "y'all," "we love working with y'all," dropping stiffer phrasing ("here's what we're proposing" → "here's what we're thinking," "to iron out logistics on the freezer placement and sampling" → simpler wording), and using first names/relationship cues instead of generic partner-speak.

**The pattern to watch for:**
AI-drafted communication defaults toward a neutral, professional register that can undersell an existing relationship. It's correct but not distinctive — it could've been written to a stranger. The more established the relationship, the more revision it typically took to get the AI draft to actually sound like the founder talking to a friend, not a vendor talking to an account.

**Reusable principle for SeedVault360:**
When using AI to draft partner or customer communication, the AI should ask (or the platform should prompt the founder) about the relationship context up front — "Do you know this person? How would you normally talk to them?" — rather than defaulting to formal business tone and waiting for the founder to notice it doesn't sound like them. For small businesses whose whole value proposition is relationship-driven (local makers, farmers market vendors, hospitality partners they see repeatedly), voice authenticity isn't cosmetic — it's part of how trust gets built and maintained. A platform feature that captures a founder's "voice profile" (regional dialect, familiarity level with known contacts, typical phrasing) could save multiple rounds of manual editing.

**Tags:** AI drafting, voice/tone, relationship management, communication, founder authenticity

---

## Lesson 003 — Pressure-testing two AIs against each other can quietly delete the deliverable
**Date:** July 2026
**Context:** Stacy Mobley's job-search network strategy. Kevin ran an iterative loop: ChatGPT produced a networking strategy, Gemini pressure-tested it, ChatGPT revised, and so on across several rounds. Claude was then asked to pressure-test the final result against the *actual* contact files (Lauren Linder's ~150 LinkedIn contacts plus Kevin's and Stephanie's networks).

**The situation:**
The original ask was concrete: *match specific named people* from Lauren's contacts to Stacy — who might hire her, and who could open doors. But after several rounds of one AI critiquing the other's *method*, the final strategy had drifted into an elegant, abstract operating model (a "3-3-1" framework with hypothetical example companies like "a healthcare network" or "a fintech organization"). It named **zero** of the 150+ real contacts in the folder. The plan even theorized about "post-acquisition integration" and "PE-backed scaling" triggers while three real companies matching those exact triggers — with warm introduction routes — sat unnamed in the contact list the whole time.

**The pattern to watch for:**
When you loop two AI systems against each other, each one grades the *other model's reasoning*, not the original source data or the original deliverable. The critiques get more sophisticated and more meta every round. The result trends toward a beautiful methodology with no fuel in it — polished process, no named output. Neither model catches this, because neither is checking the work back against the raw inputs; they're checking it against each other.

**What fixed it:**
Re-grounding in the source files. Opening the actual contact PDFs, extracting the real names/titles/companies, verifying each company's current situation against live web sources, and producing the named shortlist the assignment originally asked for. The corrected approach kept the good parts of the AI framework but re-filled it with real people.

**Reusable principle for SeedVault360:**
For small-business owners using AI, "get a second AI to check the first one" feels rigorous but has a specific failure mode: **method-on-method optimization that abandons the deliverable.** Any AI workflow — and any SeedVault360 feature that chains or cross-checks models — should force a final step that re-checks the output against the *original source data and the original request*, not just against the other model's critique. A simple platform guardrail: before delivering, ask "Does this answer name the specific things the user originally asked to identify?" If the ask was "which of these 150 people," an answer with zero of those 150 names is unfinished, no matter how good the framework looks. Founders are especially exposed here because a confident, well-structured AI deliverable *looks* done even when it never did the concrete task.

**Tags:** AI workflow, multi-model review, pressure testing, deliverable integrity, source grounding, founder guardrails

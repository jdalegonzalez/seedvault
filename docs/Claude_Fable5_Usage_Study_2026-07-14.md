# How Kevin Uses Claude & Fable 5 — A Study Against the "4 Rs" Framework

**Prepared for:** Kevin Mobley
**Date:** July 14, 2026
**Source material:** 18 local session transcripts, ~40 files across the "Brainstorming the future" project folder, the empty "Optimizing Claude Usage" folder, and stated user preferences/memory.
**Framework used:** *11 Easy Ways to Use Fable 5 So Cheap It Feels Unfair* (Root, Reduce, Ration, Reschedule), cross-checked against Anthropic's own Cowork guidance (persistent context files, Projects, outcome-oriented prompting).

---

## Overall Score: B+ (78/100)

Kevin is already doing several of the hardest, highest-leverage things in the video — often without having seen it. The gaps that remain are concentrated in one place: long, single-thread strategy sessions that regenerate entire documents from scratch instead of editing them, which is exactly the pattern the video calls "paying a strategist to argue with itself for two hours."

| Rule | Score | One-line verdict |
|---|---|---|
| **Root** (right task → right model) | 8.5/10 | Fable is reserved for real strategist work (playbooks, network strategy); quick lookups already fall to lightweight sessions. |
| **Reduce** (cut what gets reread) | 6/10 | Strong handoff-doc discipline, but the Network_Approach thread shows classic context-bloat/full-rewrite behavior. |
| **Ration** (stop overthinking/overwriting) | 7/10 | Outputs are generally decision-dense, but several sessions produced 5-6 full document versions in under an hour. |
| **Reschedule** (push non-urgent work to background) | 9/10 | A live scheduled daily Square receivables check is already running — this is the video's move #11, done correctly. |

---

## 1. Root — Sending the Right Task to the Right Model

**What's working:**

- The clearest evidence of intentional model routing is the Anoush brainstorm file, which opens: *"Continues the Fable 5 session ('Network Mining Report' + 'Team Anna Bell Playbook')."* That's a genuine strategist-tier task — synthesizing LinkedIn network data, Six Universal Laws framing, and a go-to-market playbook into decision points. This is precisely the kind of "plan the sequence, make the hard calls" work the video says belongs on Fable.
- Simple, single-answer sessions ("Data export location," "Task completion," "File access verification") stayed short and factual — no sign of strategist-tier reasoning being spent on what is essentially a lookup question ("where does Claude's data export go?"). That's the "Never-Fable Shortlist" (move #3) working by default.
- The "Daily Square receivables check" session does real judgment work (catching that Square Funding skims ~21% at payout, invisible on payment-level records) but does it inside an automated, narrow, single-purpose task — not a sprawling open-ended chat. That's efficient use of reasoning even when it's not literally the cheapest model.

**What's costing you:**

- Cowork sessions are set at the model level for the whole session, not per-message. That means the "strategist hands off to a cheaper associate" pattern (move #1) can't happen automatically inside one session the way it can in the video's Claude Code / API examples — it requires *you* to deliberately end the Fable session and open a new Sonnet/Haiku session for the execution pass. There's no evidence in the transcripts that this handoff is happening yet; the Network_Approach and playbook work all appears to run start-to-finish in the same tier.
- No "departing genius" playbook has yet been produced *for Claude itself* (i.e., a written-down operating manual that a cheap model could follow to produce Kevin-voiced content without Fable in the loop) — even though the ingredients exist. **Team Anna Bell Playbook.md** and **Team Stephanie Playbook.docx** are playbooks for *human* team members, not for cheaper AI models. That's a near-miss: the muscle memory for "bottle the judgment" is already there, it just hasn't been pointed at Claude's own model tiers yet.

---

## 2. Reduce — Cutting What the Model Has to Reread

**What's working:**

- The "Master Context Document" session is a textbook execution of the video's move #6 (**the handoff talk**) and move #4 (**the 20% reset**, project-scoped). The assistant explicitly built a single master file, flagged that a fresh session starts cold, and pointed future sessions at that file instead of requiring re-explanation. It even offered to schedule automatic refreshes.
- Multiple sessions ("Hyatt inventory log," the daily receivables check) show the pattern *"let me save X to memory so I have it next session"* before finishing — this is move #8, **reuse not repasting**, done proactively rather than only on request.
- The "MD files comparison" session delegated a genuinely heavy read (a full LinkedIn data export — dozens of CSVs, tens of thousands of connection rows) to bash/tooling and only surfaced the three findings that mattered (the Stephanie Stuckey correction, the Hyatt/US Foods warm paths, the email-channel dead end). The mountain of raw CSV data never hit the main thread. That is move #7, **the delegated read**, executed correctly.

**What's costing you — this is the single biggest lever available:**

- The Network_Approach file series is the clearest counter-example in the whole archive. On July 12, between 13:47 and 14:35 (48 minutes), the following full documents were generated in sequence: `Network_Approach_V2.md` → `Network_Approach_V3.md` (30KB, the largest file in the folder) → `network_approach_v3_review.txt` → `Network_Approach_V5.md` → `Network_Approach_Final_Verdict.md` → `V6_Strategic_RevOps_Playbook.txt` → `Network_Approach_Final_Review_V6.md` → `Network_Approach_Final_Review_Claude.md`. That's **eight artifacts, ~1,700 lines / 108KB of output, in under an hour**, several of them full re-derivations of the same strategy rather than diffs against the last version. (Note V4 doesn't exist in the folder — the version numbering itself is a symptom of iterate-by-full-regeneration rather than iterate-by-edit.)
- The `ai_performance_arbitrage_chat.md` session shows a related pattern from the other direction: long third-party model outputs (Gemini's and ChatGPT's full responses) were pasted wholesale into the conversation across eight rounds, each one rereasoned against the entire prior thread. The file's own header even flags this: *"Very long pasted third-party model responses that substantially duplicated prior content are labeled and summarized."* Cross-checking multiple models is smart; pasting their entire raw output into one growing thread instead of just the delta is the expensive way to do it.
- Two separately-built master context documents exist ("Master context document" and "ANNA BELL MAC LLC master context document" sessions) close together in time — possible duplicate handoff docs rather than one being updated. Worth consolidating into a single canonical file so it isn't rebuilt from scratch.

---

## 3. Ration — Stopping Over-thinking and Over-writing

**What's working:**

- Final outputs are generally decision-dense, not essay-shaped: the receivables-check summary leads with the number that matters ($216.76 overstated), the Hyatt inventory session leads with the two missing cost inputs blocking the model, and the network-mining session leads with three named findings. This matches move #10 (**ask lean**) — even where the *prompting* wasn't visibly lean, the *outputs* were kept close to decision format rather than throat-clearing essays.

**What's costing you:**

- The eight-artifact Network_Approach burst (above) is as much a Ration problem as a Reduce problem — six or more "final" versions of the same strategic document in under an hour is the "overwriting" half of rule 3, not just the "overthinking" half. A tighter prompt ("revise section 3 only, don't regenerate the whole doc") would have cut most of that output volume.
- Several filenames signal the same instinct at the meta level — `Network_Approach_Final_Verdict.md` followed later by `Network_Approach_Final_Review_V6.md` and then `Network_Approach_Final_Review_Claude.md` — three different "final" answers. Worth naming a stopping rule up front ("we stop at V-next, no further full rewrites") the way `weekly-mac-production` already gives production planning a fixed, bounded shape.

---

## 4. Reschedule — Pushing Non-Urgent Work to the Background

**What's working — this is the strongest of the four:**

- A live scheduled task, **"Daily Square receivables check,"** is running unattended and doing genuinely valuable judgment work (catching the Square Funding skim, correcting AR overstatement) without Kevin having to prompt it in real time. This is exactly move #11, **set it and sleep**, and it's the most direct match to the video's advice found anywhere in the archive.
- Production planning is governed by a dedicated skill (`weekly-mac-production`) rather than an ad hoc chat every week — that's the "bottled playbook" pattern applied to a recurring operational task, which is functionally the same value as move #2 (**the departing genius**) even though it wasn't built by asking Fable to write a handoff prompt explicitly.

**What's costing you:**

- Nothing especially — this is the one category where no real waste showed up in the sample. The obvious next step (not a fix, an expansion) is applying the same pattern to the Hyatt inventory tracking, which currently shows three separate manually-triggered "Hyatt inventory log" sessions rather than one scheduled/recurring check like the receivables task has.

---

## 5. Cross-check Against Anthropic's Own Cowork Guidance

Beyond the video, Anthropic's current Cowork guidance emphasizes three things worth naming explicitly:

1. **Persistent context files** (an identity file, a voice/style profile, standing instructions) loaded automatically rather than re-explained — Kevin has the beginnings of this (Master Context Document, SeedVault360 lessons file) but it isn't yet centralized as a Global Instructions / Project-level file the way Anthropic recommends.
2. **Projects tying files + instructions + scheduled tasks to a defined scope**, so context doesn't need reestablishing each session — the "Brainstorming the future" folder is doing this informally through file naming, but the still-empty "Optimizing Claude Usage" folder suggests this discipline hasn't been extended there yet.
3. **Outcome-oriented prompting** ("produce a report with X, Y, Z" rather than step-by-step instructions) — the transcripts sampled show this style already in use (e.g., the Master Context Document request), which tracks with the video's move #10 (ask lean, name the shape up front).

Sources: [Get started with Claude Cowork](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork), [Claude Cowork | Anthropic](https://www.anthropic.com/product/claude-cowork)

---

## 6. The Three Highest-Leverage Fixes

1. **Give the Network_Approach pattern a stopping rule.** Next time a strategy doc needs revision, say "edit section 3 in place, don't regenerate the full document" — this alone would likely have cut that 48-minute burst from 8 artifacts to 2-3.
2. **Turn the Master Context Document into one canonical, scheduled-refresh file** instead of two separately-built versions — this is 90% built already; it just needs consolidating and the weekly refresh (already offered, not yet accepted) turned on.
3. **Run one explicit "departing genius" prompt on Fable** — ask it to write down, once, how it thinks about the Network Mining / Hospitality-targeting strategy so that future execution passes (drafting outreach messages, formatting shortlists) can run on a cheaper model instead of continuing the Fable thread. This is the one move from the video Kevin hasn't used yet, and it's the one with the highest payoff given how often this exact workflow (network targeting → playbook → outreach) recurs.

---

## Appendix: Evidence Reviewed

- Session transcripts: Daily Square receivables check, Master context document, ANNA BELL MAC LLC master context document, Hyatt inventory log (×3), MD files comparison, Data export location, Brainstorming session with Anoush, Integrated production plan, and 10 others (scanned by name/idle state).
- Files: `Anoush_Brainstorm_Expansion_SixLaws.md` (explicit "Fable 5 session" reference), the `Network_Approach_V2` → `Final_Review_Claude` chain (8 files, 1 session, 48 minutes), `ai_performance_arbitrage_chat.md`, `Team Anna Bell Playbook.md`/`.docx`, `Capital_Funding_Project_Summary.md`, `AnnaBellMac_Project_Summary.md`.
- Confirmed empty: "Optimizing Claude Usage" project folder (no files yet — this report is a reasonable first artifact for it).

*This is a sample-based study, not an exhaustive audit of every message across every session — the goal was to identify real, evidenced patterns rather than guess at token counts I can't see.*

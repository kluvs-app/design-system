---
description: Audit all known client repos (kluvs-mobile, kluvs-frontend) for compliance with the design system, by running the portable /design-system-compliance check against each in parallel, then synthesizing one merged report. Proposes (does not apply) a diff to CLAUDE.md's "Pending propagation" section.
---

# Propagation Audit

This is a thin orchestrator. It does not contain any compliance-checking logic itself — that
logic lives in the portable `/design-system-compliance` skill (`ai-tooling/skills/`), which any
client repo can also run standalone on itself. This command's only job is to run that same
check against every known client and merge the results for this repo's benefit.

## Known clients

```
/Users/ivangarzab/Git/KLUVS/kluvs-mobile
/Users/ivangarzab/Git/KLUVS/kluvs-frontend
```

Adding a future client is a one-line addition to this list — no new checking logic needed.

## Step 1 — Run the check against each client, in parallel

Spawn one agent per client repo, in the same message (they're independent, no shared state).
Each agent's prompt should put it in the position of a developer sitting in that repo running
the check on themselves — same invocation a human would use, not a special orchestrated mode:

```
Agent({
  description: "Design-system compliance check — <repo-name>",
  prompt: """
    Your working directory is /Users/ivangarzab/Git/KLUVS/<repo-name>.
    Run the `/design-system-compliance` skill (invoke it via the Skill tool) to audit this
    repo against the Kluvs design system. Report back its full output verbatim — the
    Markdown checklist with file:line evidence — plus nothing else.
  """
})
```

Use a fresh general-purpose agent for each (not a fork) — they need no context from this
conversation, only the working directory and the instruction to run the skill.

## Step 2 — Merge into one report

Both agents check against the same underlying source (`design-system`, read fresh by each), so
their findings line up by the same tiers (A: non-negotiable facts, B: pending-propagation items,
C: cross-platform model adoption). Merge into one table, one row per checked item, one column
per client:

| Item | kluvs-mobile | kluvs-frontend |
|---|---|---|
| ... | ✅ / ❌ / ⚠️ + evidence | ✅ / ❌ / ⚠️ + evidence |

Print this full table to the user. This table is the audit's output — it is not something to
persist anywhere.

## Step 3 — Propose a CLAUDE.md diff, don't apply it

Read this repo's own `CLAUDE.md`, section "Pending propagation to client repos". That section
is loaded into every session's context in this repo, so it must stay signal-only — a bullet per
genuinely open item, nothing for compliant items, and no table.

Compare the merged results against that section's current bullets:

- An item logged as pending that both clients now show ✅ for → propose **removing** that
  bullet entirely. Do not replace it with a "resolved" note — just delete it, the same way the
  file already has old resolved items that should themselves be cleaned up.
- A ❌ or ⚠️ finding with no corresponding bullet yet → propose **adding** one, in the same
  terse one-liner-plus-context prose style as the existing bullets (see the file for the
  pattern), dated if it references something newly discovered.
- An item still accurately ❌/⚠️ and already logged → leave it untouched.

Show the user the proposed diff (before/after for the section) and ask before editing
`CLAUDE.md`. Do not edit any client repo — this command, and the skill it runs, are read-only
everywhere.

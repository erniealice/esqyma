---
name: planner
description: Creates structured implementation plans with progress tracking for any task in the monorepo. Use when starting any non-trivial feature, refactor, or bug fix that spans multiple files or steps. Produces plan.md and progress.md in the correct docs/plan/ directory, estimates context budget, and determines whether sub-agents are needed.
---

# Planner

Structured planning skill for the calcglob monorepo. Produces a **plan.md** and **progress.md** for every non-trivial task.

---

## When to Use

Use this skill when:
- A task touches **3+ files** or requires **3+ distinct steps**
- A feature spans **both an app and a package**
- You need to **resume work** from a previous session
- The user explicitly asks to plan before implementing

Do NOT use for trivial single-file fixes (typos, one-liner bug fixes, adding a comment).

---

## Step 1: Determine Scope & Location

### Identify the target

Ask yourself: **which app or package owns this work?**

| Scope | Plan location |
|-------|---------------|
| Single app (e.g., recruiter) | `apps/{app}/docs/plan/{date}-{title}/` |
| Single package (e.g., ui) | `packages/{package}/docs/plan/{date}-{title}/` |
| Cross-cutting (app + package) | Put it where the **primary change** lives. Note the cross-cutting nature in the plan. |

### Naming convention

- **Date format:** `YYYYMMDD` (no dashes in date — e.g., `20260201`)
- **Title:** lowercase, hyphenated, 2-4 words (e.g., `client-contact-division`)
- **Full path example:** `apps/recruiter/docs/plan/20260201-client-contact-division/plan.md`

### Branch naming

Suggest a branch name following the convention:
```
dev/{YYYYMMDD}-{short-title}
```
Example: `dev/20260201-client-contact-division`

**IMPORTANT:** Only suggest the branch name in the plan document. NEVER create or checkout branches yourself. The user manages branches manually.

---

## Step 2: Explore & Estimate Context Budget

Before writing the plan, **explore the codebase** to understand what files are involved.

### Context budget estimation

Claude Code has a ~200k token context window. Estimate whether the task fits in a single session:

| Factor | Estimate |
|--------|----------|
| Average source file | ~100-300 lines ≈ 400-1200 tokens |
| Average template file | ~50-150 lines ≈ 200-600 tokens |
| CSS file | ~100-400 lines ≈ 400-1600 tokens |
| Go file | ~50-200 lines ≈ 200-800 tokens |

**Rule of thumb:**
- **< 30 files to read+modify** → Single session, no sub-agents needed
- **30-60 files** → Consider sub-agents for parallel exploration
- **60+ files** → Mandatory sub-agents; split into phases that can run independently

### When to use sub-agents

Use the Task tool with specialized agents when:
- **Exploration phase:** Use `subagent_type=Explore` to scan for patterns across many files before writing the plan
- **Parallel implementation:** When independent phases can execute concurrently (e.g., CSS migration across 16 files while Go types are being extended)
- **Large file audits:** Searching for hardcoded values, deprecated patterns, or missing imports across the entire codebase

Document sub-agent strategy in the plan under **Context & Sub-Agent Strategy**.

---

## Step 3: Write plan.md

Create the plan file with the following structure. Every section is required unless marked optional.

```markdown
# {Title} — Design Plan

**Date:** {YYYY-MM-DD}
**Branch:** `dev/{YYYYMMDD}-{short-title}`
**Status:** Draft | In Progress | Complete
**App/Package:** {name}

---

## Overview

{1-3 sentences: what are we building/changing and why}

---

## Motivation (optional — include for non-obvious changes)

{Why this change matters. What problem it solves. What happens if we don't do it.}

---

## Architecture (optional — include for structural changes)

{Diagrams, data flow, type structures, HTML layout mockups — whatever clarifies the design}

---

## Implementation Steps

Break into **phases**. Each phase should be independently committable.

### Phase 1: {Name}
- Step description with **file reference:** `path/to/file.go:123`
- Step description with **file reference:** `path/to/file.html`

### Phase 2: {Name}
- ...

---

## File References

| File | Change | Phase |
|------|--------|-------|
| `path/to/file.go` | Add new types for X | 1 |
| `path/to/file.html` | Update template to use new component | 2 |
| `path/to/new-file.go` | **New file** — handler for Y | 2 |

IMPORTANT: Every file that will be created or modified MUST appear in this table.

---

## Context & Sub-Agent Strategy

**Estimated files to read:** {N}
**Estimated files to modify:** {N}
**Estimated context usage:** {Low (<30 files) | Medium (30-60) | High (60+)}

{If High or Medium:}
**Sub-agent plan:**
- Phase 1 can use `Explore` agent to audit {X}
- Phase 2-3 can run in parallel via separate `Task` agents
- Phase 4 depends on Phase 1-3 results

{If Low:}
No sub-agents needed. Single session is sufficient.

---

## Risk & Dependencies (optional — include when relevant)

| Risk | Impact | Mitigation |
|------|--------|------------|
| {e.g., Breaking change to shared type} | {High — affects all apps} | {Add backward-compatible alias during migration} |

**Dependencies:**
- Phase 2 depends on Phase 1 (types must exist before templates use them)
- Phase 3 is independent and can run in parallel with Phase 2

---

## Acceptance Criteria

- [ ] {Specific, testable criterion}
- [ ] {e.g., All hardcoded border-radius values replaced with tokens}
- [ ] {e.g., Settings tab renders correctly with matrix table}
- [ ] {e.g., Build passes with no type errors}
- [ ] {e.g., E2E tests pass}

---

## Design Decisions (optional — include for trade-off explanations)

{Why you chose approach A over B. Future readers will thank you.}
```

---

## Step 4: Write progress.md

Create the progress file alongside the plan:

```markdown
# {Title} — Progress Log

**Plan:** [plan.md](./plan.md)
**Started:** {YYYY-MM-DD}
**Branch:** `dev/{YYYYMMDD}-{short-title}`

---

## Phase 1: {Name} — NOT STARTED

- [ ] {Step from plan}
- [ ] {Step from plan}

---

## Phase 2: {Name} — NOT STARTED

- [ ] {Step from plan}
- [ ] {Step from plan}

---

## Summary

- **Phases complete:** 0 / {N}
- **Files modified:** 0 / {N}

---

## Skipped / Deferred (update as you work)

| Item | Reason |
|------|--------|
| — | — |

---

## How to Resume

{Instructions for a fresh Claude session to pick up where this left off.
Include: which phase to start on, which files to read first, any gotchas.}

To continue this work:
1. Read this progress file and the [plan](./plan.md)
2. Check git status for any uncommitted changes from the previous session
3. Start from the first incomplete phase above
4. Update checkboxes and summary as you complete steps
```

---

## Step 5: Maintain Progress During Implementation

As you implement:

1. **Before starting a phase:** Update its status to `IN PROGRESS` in progress.md
2. **After completing a step:** Check off the checkbox immediately
3. **After completing a phase:** Update status to `COMPLETE`, update summary counts
4. **If skipping something:** Add it to the Skipped/Deferred table with a reason
5. **If blocked:** Note the blocker in progress.md and update "How to Resume"
6. **On session end:** Always update "How to Resume" with current state

---

## File Reference Rules

**Every file reference in the plan must use the relative path from project root:**
- ✅ `apps/recruiter/internal/presentation/client/views/detail/model.go`
- ✅ `packages/ui/styles/layout.css`
- ❌ `model.go`
- ❌ `../../packages/ui/styles/layout.css`

**Include line numbers when referencing specific code:**
- ✅ `packages/ui/types/table.go:45` (line 45, where ColumnGroup is defined)
- ✅ `apps/recruiter/templates/client/detail.html:12-18` (lines 12-18, tab buttons)

---

## Monorepo Structure Reference

```
apps/
  admin/          — Admin application
  msp/            — MSP application
  recruiter/      — Recruiter application
packages/
  domain/         — Domain types and business logic
  repositories/   — Data access layer
  schema/         — Database schema
  ui/             — Shared UI components, styles, templates
```

---

## Quick Reference: Plan Checklist

Before marking the plan as ready:

- [ ] Overview clearly states what and why
- [ ] Every modified/created file is in the File References table
- [ ] Implementation steps are broken into independently committable phases
- [ ] Context budget is estimated and sub-agent strategy is documented
- [ ] Acceptance criteria are specific and testable
- [ ] Branch name is suggested
- [ ] progress.md is created with all phases and steps as unchecked items
- [ ] "How to Resume" section is populated (even if just "Start from Phase 1")

---
description: Create a spot illustration for one catalog screen — concepts, renders, edits, export, both-surface preview, catalog row — using the illustrations MCP. Pass the catalog name (e.g. empty-shelf). Stops for the user's pick at every step; commits only on their go.
---

# Illustration Create

Drives `docs/illustrations.md` § Generating an illustration for one screen. That spec owns every
rule (style, palette, accent, hexagons, what never appears, export settings); this command
restates none of them. Read it in full before step 2.

Paths:

- DS = `/Users/ivangarzab/Git/KLUVS/design-system`
- DRAFTS = `/Users/ivangarzab/Git/KLUVS/temp/illustrations` (written by the MCP, never committed)
- VENV = `DRAFTS/.venv`

The user picks from images, not descriptions. Show, then ask. One change at a time.

## Arguments

The raw input is: `$ARGUMENTS`

The catalog name of the screen (e.g. `empty-shelf`). If empty, list the catalog rows whose
concept is still "Open — exploring" and ask which one.

## Step 0 — Preconditions

1. The `mcp__illustrations__*` tools must be available. If not, point to
   `ai-tooling/mcp-illustrations/README.md` § Setup and stop.
2. `git -C DS status --short` must be clean. The MCP reads the spec from whatever branch is
   checked out, so the branch must have the current spec (`main`, or a branch cut from it).
   Don't stash or switch for the user; say what's wrong and stop.
3. If the name isn't in the catalog, propose a row (name, screen) and wait for approval.

## Step 1 — Concepts

Propose three different concepts in chat, each as: a name, the scene (one wooden subject, one
or two sentences), and the focal detail that gets the accent. Follow the spec's subject,
accent and mood rules (on error screens the accent goes on the hopeful element). Don't
mention style, palette, hexagons or the no-people/no-text rules: the server adds them.

Let the user adjust, then call `generate_concepts` and `open` the contact sheet
(`index.html`) it returns. Point out any draft that breaks a rule in
`docs/illustrations.md` § What never appears (seen in practice: a frame or border, palette
swatches drawn into the image, tiny text). Ask which one to keep, or whether to try new
concepts.

Never change the locked style prompt to fix a single bad run. Regenerate instead, and only
raise a prompt change if the same problem repeats across runs.

## Step 2 — Renders (optional)

Offer `generate_renders` of the chosen concept (up to three). `open` the contact sheet and ask
which to keep. Skip if the user is happy with the concept draft.

## Step 3 — Edits (optional, repeatable)

For targeted fixes, call `edit_draft` on the chosen image with **one** instruction per call
(e.g. "make the entire ladder green, both rails and every rung"). `open` the
`<name>-edits.html` comparison after each call. To keep refining an edit, pass the edit's
path. To combine parts of two drafts, describe the wanted part in words as an edit to one of
them. Repeat until the user picks a final image.

## Step 4 — Export and preview

1. Copy the final image, as is, to `DS/assets/illustrations/source/<name>.<ext>` (keep its
   extension; replace any older source for this name).
2. If `VENV/bin/python` is missing: `python3 -m venv VENV && VENV/bin/pip -q install pillow numpy`.
3. Run `VENV/bin/python DS/scripts/export-illustration.py [--loose-strokes] <source> <name>`
   with the setting from the spec's export rules (default unless the scene has a hatched
   floor or loose strokes around the subject).
4. `open` the preview page the script prints (`DRAFTS/<name>/preview.html`): the PNG on both
   surfaces with a heading, body and button. Point out dark blocks on the light surface; if
   there are any, offer to re-export with the other setting and preview again.
5. Ask the user to approve the export. Don't go on until they do.

## Step 5 — Catalog and changelog

1. Update the screen's catalog row in `DS/docs/illustrations.md`: concept, focal detail and
   export setting. Leave the rest of the spec alone.
2. Add a bullet for `assets/illustrations/<name>.png` and its source under
   `CHANGELOG.md` `[Unreleased]` → `### Added — illustrations`. Don't bump `VERSION`.

## Step 6 — Commit

Show `git -C DS status --short` and the catalog diff, then wait for the user's go. On go:

1. If on `main`, create `feat/illustration-<name>` from it.
2. Commit the PNG, its source, the catalog row and the changelog:
   `feat(illustrations): add the <name> illustration`.
3. Push and open a PR against `main` only if the user asks. Never merge it.

# Wijaya And Partners Content Intake Document Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce a professional, fillable-by-typing DOCX questionnaire that gathers every approval and asset needed to convert the Wijaya And Partners MVP into a production company profile.

**Architecture:** A reproducible Python builder uses the bundled workspace document runtime to generate one structured DOCX from a declarative section list. Automated content tests verify coverage, and the Documents workflow renders every page to PNG for visual inspection before the final file is delivered.

**Tech Stack:** Bundled workspace Python, `python-docx`, OOXML helpers from the Documents skill, bundled `render_docx.py`, bundled accessibility and privacy utilities.

**Spec:** `docs/superpowers/specs/2026-10-06-wijaya-partners-company-profile-design.md`

**Source material:** `docs/superpowers/specs/2026-10-06-wijaya-partners-source-material.md`

## Global Constraints

- Use the `documents:documents` skill and the runtime returned by `mcp__codex_app__load_workspace_dependencies`; do not use system Python or global packages.
- Immediately before the first DOCX authoring command, run `mark_artifact_operation_started.mjs` exactly once with operation kind `create`, expected output count `1`, and output format `docx`.
- Default to Letter portrait, readable 11–12 pt body text, black titles and headings, and a restrained burgundy accent compatible with the firm identity.
- Design the questionnaire as a usable form with clear prompts and generous response areas, not as a spreadsheet or dense grid.
- Do not use decorative callout boxes, shaded note cards, or ornamental title rules.
- Include explicit approval fields for claims, client logos, case details, translations, contact data, image rights, legal disclaimer, domain, hosting ownership, and final sign-off.
- Render the document to PNG, inspect every page, and iterate until no clipping, overlap, awkward blank page, cramped field, or inconsistent heading remains.
- Deliver only `deliverables/Wijaya-Partners-Website-Content-Intake.docx`; QA renders remain internal.

## Review Focus

1. Long biographies, credentials, and matter descriptions must have enough writing space without fixed-height clipping; Task 1 tests expanding response structures and Task 2 inspects rendered pages.
2. A respondent must be able to distinguish factual confirmation from publication permission; Task 1 requires separate check fields for accuracy and permission.
3. Optional fields must not look mandatory, while all production-blocking approvals are clearly marked required; Task 1 asserts the required-marker legend and exact mandatory sections.
4. Indonesian and English approval must be independently recorded; Task 1 tests separate language sign-off fields.
5. Tables that continue across pages must repeat headers and avoid orphaned prompt labels; Task 2 inspects all multipage structures after rendering.

---

### Task 1: Build And Test The Content Intake Form

**Files:**
- Create: `scripts/documents/build_content_intake.py`
- Create: `tests/documents/test_content_intake.py`
- Create: `deliverables/Wijaya-Partners-Website-Content-Intake.docx`

**Interfaces:**
- Consumes: approved spec, source-material record, and the bundled workspace dependency paths.
- Produces: `build_content_intake(output_path: Path) -> None` and the single requested DOCX deliverable.

- [ ] **Step 1: Load the bundled workspace document runtime**

Call `mcp__codex_app__load_workspace_dependencies` and record the returned Node executable, Python executable, package directory, Documents skill directory, and renderer path for the current execution.

- [ ] **Step 2: Mark the artifact operation exactly once**

Using the returned bundled Node executable and package directory, run `container_tools/mark_artifact_operation_started.mjs --operation-kind create --expected-output-count 1 --output-format docx` before any DOCX creation command.

- [ ] **Step 3: Write the failing document-content test**

Assert the generated document has a Word `Title` paragraph named `Wijaya And Partners Website Content Intake`, an opening explanation, a required-field legend, all ten approved intake sections, separate accuracy and publication-permission choices, separate Indonesian and English approval fields, a final authorized-signatory block, and no `TBD`, `TODO`, or empty heading.

- [ ] **Step 4: Run the focused test and verify failure**

Run with the bundled Python executable: `tests/documents/test_content_intake.py`

Expected: FAIL because the builder and DOCX do not exist.

- [ ] **Step 5: Implement the deterministic DOCX builder**

Create focused helpers for document styles, section headings, labeled short-answer fields, expandable long-answer areas, checkbox choices, repeated-record tables, and sign-off fields. Keep all prompts in Indonesian with concise English field hints only where they prevent ambiguity.

- [ ] **Step 6: Generate the DOCX**

Run the builder with the bundled Python executable and write only `deliverables/Wijaya-Partners-Website-Content-Intake.docx` as the final artifact.

- [ ] **Step 7: Run the content test**

Run with the bundled Python executable: `tests/documents/test_content_intake.py`

Expected: PASS with all required sections and approval controls detected.

- [ ] **Step 8: Commit the first complete document**

```bash
git add scripts/documents/build_content_intake.py tests/documents/test_content_intake.py deliverables/Wijaya-Partners-Website-Content-Intake.docx
git commit -m "docs: add website content intake form"
```

### Task 2: Render Inspect And Finalize The Document

**Files:**
- Modify: `scripts/documents/build_content_intake.py`
- Modify: `deliverables/Wijaya-Partners-Website-Content-Intake.docx`
- Modify: `tests/documents/test_content_intake.py` only when a real missing requirement needs a regression test.

**Interfaces:**
- Consumes: Task 1 builder and draft DOCX.
- Produces: visually verified, metadata-scrubbed final DOCX with unchanged required content.

- [ ] **Step 1: Render the document into a temporary QA directory**

Use the bundled Documents `render_docx.py` with `--emit_pdf`; keep PNG and PDF outputs in a task-local temporary directory outside `deliverables`.

- [ ] **Step 2: Inspect every rendered page at full readable detail**

Open every page PNG and check title treatment, section hierarchy, response-field size, table continuation, repeated headers, checkbox alignment, page breaks, footer consistency, and absence of clipping or overlap.

- [ ] **Step 3: Fix each observed layout defect in the builder**

Change widths, paragraph spacing, keep-with-next settings, cell padding, or deliberate page breaks in the smallest owning helper; regenerate and rerender after every revision round.

- [ ] **Step 4: Run accessibility and metadata checks**

Use the bundled `a11y_audit.py` and `privacy_scrub.py`; apply safe fixes for missing image alt text if any images exist, remove personal author metadata, and regenerate the final DOCX without altering questionnaire content.

- [ ] **Step 5: Repeat render inspection after the final change**

Expected: every page is readable at fit-width, tables and fields have breathing room, no prompt is orphaned from its response area, and no unexpected blank page remains.

- [ ] **Step 6: Re-run deterministic tests**

Run with the bundled Python executable: `tests/documents/test_content_intake.py`

Expected: PASS after all visual and metadata fixes.

- [ ] **Step 7: Open the final DOCX in Codex**

Use `open_in_codex` on the absolute deliverable path so the user can inspect the artifact directly.

- [ ] **Step 8: Commit the verified document**

```bash
git add scripts/documents/build_content_intake.py tests/documents/test_content_intake.py deliverables/Wijaya-Partners-Website-Content-Intake.docx
git commit -m "docs: verify content intake document"
```

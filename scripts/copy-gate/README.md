# Copy gate

Scores the copy of every visitor-facing page of nexusmethod.ai for machine-sounding patterns (AI vocabulary, "not just X, but Y" constructions, em-dash cadence, rule-of-three lists, stacked hyphenated compounds, semicolon-heavy prose). Each page is scored 0 to 5. The gate passes only when every page is 5/5.

## How it works

The deployed site is a forwarding address: `next.config.ts` 301s every path to mollyjaggers.com, so building and fetching the site yields a redirect and no copy. The copy that ships the moment that redirect comes down is authored in `src/content.ts` (the copy map, every string literal is page copy) and `src/app/privacy/page.tsx` (inline JSX). The gate extracts the copy from those two files with `extract.py`, writes one text file per page, and scores each with `deslop.py`. No build or Node is needed, so the workflow only sets up Python.

- `deslop.py` is a vendored copy of the slopmonster checker from the AgentOS repo (`.claude/skills/slopmonster/tools/deslop.py`). Standard-library Python 3, no dependencies.
- `extract.py` pulls the copy out of the two source files. Link targets, single-word keys and template strings with code in them are dropped.
- `allow.txt` lists brand, product and trade terms that are never flagged (one per line). Add a term here only when it is a real name or a trade term, never to make a page pass.
- Proof-number findings are advisory and do not lower the score.

If the site ever serves pages again, switch the script to build, serve and fetch each route (the mollyjaggers.com repo has that version of `run.sh`) so the gate scores what visitors actually read.

## Run it

```bash
bash scripts/copy-gate/run.sh
```

The workflow in `.github/workflows/copy-gate.yml` runs the same script on every pull request and on every push to main. It is separate from `vercel-deploy.yml`, which is untouched.

## Current state (11/6/26)

The gate is advisory (`continue-on-error: true`) because the authored copy is below 5/5. It flips to blocking once every page is clean.

| Page | Source | Score | Findings |
| --- | --- | --- | --- |
| home | `src/content.ts` | 3/5 | "leverage" (2: "highest-leverage"); rule-of-three lists: "operate, troubleshoot, and adjust", "scope, build, and hand" |
| privacy | `src/app/privacy/page.tsx` | 3/5 | semicolon-heavy (4 semicolons in 391 words); rule-of-three list: "schedule, confirm, and prepare" |

## Who fixes copy

Quill owns the copy, working through the slopmonster skill in the AgentOS repo. Engineers do not rewrite page copy to make the gate pass. When the pages are clean, remove `continue-on-error: true` from the workflow so it blocks regressions.

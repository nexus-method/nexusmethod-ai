#!/usr/bin/env python3
"""Pull the visitor-facing copy out of the source files so deslop.py can score it.

nexusmethod.ai currently 301s every path to mollyjaggers.com (see next.config.ts),
so building and fetching the site yields a redirect and no copy. The copy that
would ship the moment that redirect comes down lives in two places:

  src/content.ts            the copy map: every string literal is page copy
  src/app/privacy/page.tsx  inline JSX text

This writes one plain-text file per source into the output directory. Links and
identifiers are dropped, since a URL or a CSS class is not copy.

    python3 extract.py <repo root> <out dir>
"""
import re
import sys
from pathlib import Path

root = Path(sys.argv[1])
out = Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)

STRING_RE = re.compile(r'"((?:[^"\\]|\\.)*)"|\'((?:[^\'\\]|\\.)*)\'|`((?:[^`\\]|\\.)*)`', re.S)


def is_copy(s):
    s = s.strip()
    if not s or len(s.split()) < 2:
        return False                     # a key, a slug, a class name, a single word
    if re.match(r'^(https?:|mailto:|#|/)', s):
        return False                     # a link target
    if re.search(r'\$\{', s):
        return False                     # a template with code in it
    return True


def strip_comments(src):
    src = re.sub(r'/\*.*?\*/', ' ', src, flags=re.S)
    return re.sub(r'^\s*//.*$', ' ', src, flags=re.M)


def copy_map(path):
    src = strip_comments(path.read_text(encoding='utf-8'))
    found = []
    for m in STRING_RE.finditer(src):
        s = next(g for g in m.groups() if g is not None)
        s = s.encode('utf-8').decode('unicode_escape', errors='ignore') if '\\' in s else s
        if is_copy(s):
            found.append(s.strip())
    # Each string is its own line of copy. Joined with a sentence break so two
    # labels never read as one machine-cadence sentence, the same way deslop.py
    # treats Markdown bullets.
    return ' . \n'.join(found)


def jsx_text(path):
    src = strip_comments(path.read_text(encoding='utf-8'))
    body = src.split('return (', 1)[-1] if 'return (' in src else src
    body = re.sub(r'\{/\*.*?\*/\}', ' ', body, flags=re.S)
    body = re.sub(r'\{[^{}]*\}', ' ', body)                 # JSX expressions
    body = re.sub(r'<[^>]+>', '\n', body)                   # tags
    lines = [l.strip() for l in body.splitlines()]
    return ' . \n'.join(l for l in lines if l and not re.match(r'^[);\]}]+$', l))


sources = {
    'home': copy_map(root / 'src' / 'content.ts'),
    'privacy': jsx_text(root / 'src' / 'app' / 'privacy' / 'page.tsx'),
}
for name, text in sources.items():
    (out / f'{name}.html').write_text(text, encoding='utf-8')
    print(f'{name}: {len(text.split())} words from source')

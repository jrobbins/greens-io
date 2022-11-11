import re

WORD_RE = re.compile(r'\w+')

def to_snake_case(s):
  """Convert a series of words, spaces, and punct to a snake."""
  s = s.lower()
  words = WORD_RE.findall(s)
  return '_'.join(words)

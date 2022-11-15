import re
import datetime

WORD_RE = re.compile(r'\w+')

def to_snake_case(s):
  """Convert a series of words, spaces, and punct to a snake."""
  s = s.lower()
  words = WORD_RE.findall(s)
  return '_'.join(words)


def next_weekday(day_of_year):
  year = datetime.date.today().year
  day_one = datetime.date(year=year, month=1, day=1)
  next_day = day_one + datetime.timedelta(days=day_of_year)
  while next_day.weekday() >= 5:
    next_day = next_day + datetime.timedelta(days=1)
  return next_day.timetuple()[7]



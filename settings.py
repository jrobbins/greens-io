import logging
import os

# Truncate some log lines to stay under limits of Google Cloud Logging.
MAX_LOG_LINE = 200 * 1000


UNIT_TEST_MODE = os.environ['SERVER_SOFTWARE'].startswith('test')

if not UNIT_TEST_MODE:
  # Py3 defaults to level WARN.
  logging.basicConfig(level=logging.INFO)

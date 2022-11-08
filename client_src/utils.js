const formatter = new Intl.NumberFormat();

export function commas(value) {
  if (typeof(value) == 'number') {
    return formatter.format(value);
  }
  return value;
}

export function toCamelCase(s) {
  const words = [...s.matchAll(/[a-z0-9]+/ig)].map(m => m[0]);
  const capWords = words.map((w, i) =>
    i == 0 ?
      w.toLowerCase() :
      w.charAt(0).toUpperCase() + w.slice(1)
  );
  return capWords.join('');
}

export function toSnakeCase(s) {
  s = s.toLowerCase();
  const words = [...s.matchAll(/[a-z0-9]+/ig)].map(m => m[0]);
  return words.join('_');
}

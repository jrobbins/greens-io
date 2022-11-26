const formatter = new Intl.NumberFormat();

export function commas(value) {
  if (typeof(value) == 'number') {
    return formatter.format(value);
  }
  return value;
}


export function toKMBTQ(value) {
  if (value < 1000)
    return value;
  if (value < 1e6)
    return Math.floor(value/ 1000) + 'K';
  if (value < 1e9)
    return Math.floor(value/ 1e6) + 'M';
  if (value < 1e12)
    return Math.floor(value/ 1e9) + 'B';
  if (value < 1e15)
    return Math.floor(value/ 1e12) + 'T';

  return Math.floor(value/ 1e15) + 'Q';
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

export function toSlug(s) {
  s = s.toLowerCase();
  const words = [...s.matchAll(/[a-z0-9]+/ig)].map(m => m[0]);
  return words.join('-');
}

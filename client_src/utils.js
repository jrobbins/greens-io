const formatter = new Intl.NumberFormat();

export function commas(number) {
  return formatter.format(number);
}

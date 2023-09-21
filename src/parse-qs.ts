function isValidNumber(n: number): boolean {
  return !Number.isNaN(n) && Number.isSafeInteger(n) && n >= 0 && n < 5000;
}

function isValidItem(i: string): boolean {
  return (
    i.length > 1 &&
    (i.endsWith("f") || i.endsWith("b")) &&
    isValidNumber(Number(i.slice(0, -1)))
  );
}

export function isValidList(a: string): boolean {
  return a.length >= 2 && a.split("-").every(isValidItem);
}

export function parseA(a: string): string[][] {
  return a.split("-").map((c) => [c.slice(0, -1), c.slice(-1)]);
}

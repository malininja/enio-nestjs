export function parseDecimal(data: string): number {
  return parseFloat(data.toString().replace('.', '').replace(',', '.'));
}

export function parseBool(data: string): boolean {
  try {
    return JSON.parse(data.toString().toLowerCase());
  } catch (e) {
    return false;
  }
}

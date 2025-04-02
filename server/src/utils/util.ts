export default function randomString() {
  return Math.random().toString(36).substring(2, 12);
}

export function excludeFields<T, K extends keyof T>(
  obj: T,
  keys: K[],
): Omit<T, K> {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result;
}

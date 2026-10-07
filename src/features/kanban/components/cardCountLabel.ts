export function cardCountLabel(count: number, limit: number | undefined): string {
  if (limit !== undefined) {
    return `${count} of ${limit} cards`;
  }
  return count === 1 ? '1 card' : `${count} cards`;
}

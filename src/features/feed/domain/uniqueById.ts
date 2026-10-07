export function uniqueById<Item extends { id: number }>(items: readonly Item[]): Item[] {
  const seenIds = new Set<number>();
  return items.filter((item) => {
    if (seenIds.has(item.id)) return false;
    seenIds.add(item.id);
    return true;
  });
}

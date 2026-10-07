export async function fetchJson(url: string): Promise<unknown> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request to ${url} failed with status ${response.status}`);
  return response.json();
}

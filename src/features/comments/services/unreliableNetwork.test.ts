import { afterEach, describe, expect, it, vi } from 'vitest';
import { unreliableNetwork } from './unreliableNetwork';

const sampleSize = 10_000;

async function millisecondsUntilResponse(): Promise<number> {
  let settled = false;
  void unreliableNetwork.waitBeforeResponding().then(() => {
    settled = true;
  });
  let elapsed = 0;
  while (!settled) {
    await vi.advanceTimersByTimeAsync(50);
    elapsed += 50;
  }
  return elapsed;
}

describe('unreliableNetwork', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('answers every request after one to two seconds', async () => {
    vi.useFakeTimers();
    const waits: number[] = [];

    for (let request = 0; request < 50; request += 1) {
      waits.push(await millisecondsUntilResponse());
    }

    expect(Math.min(...waits)).toBeGreaterThanOrEqual(1000);
    expect(Math.max(...waits)).toBeLessThanOrEqual(2050);
  });

  it('fails roughly one request in five', () => {
    const failures = Array.from({ length: sampleSize }, () => unreliableNetwork.shouldFail()).filter(Boolean);

    expect(failures.length / sampleSize).toBeGreaterThan(0.17);
    expect(failures.length / sampleSize).toBeLessThan(0.23);
  });
});

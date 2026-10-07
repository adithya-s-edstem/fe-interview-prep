import { describe, expect, it } from 'vitest';
import type { SendAttempt } from './commentTypes';
import { sendStatusOf } from './sendStatusOf';

const content = { clientId: 'a', text: 'Hello', createdAt: '2026-01-01T10:00:00.000Z' };

function attempt(status: SendAttempt['status'], isPaused: boolean): SendAttempt {
  return { content, status, isPaused };
}

describe('sendStatusOf', () => {
  it('reports a paused send as queued', () => {
    expect(sendStatusOf(attempt('pending', true))).toBe('queued');
  });

  it('reports a running send as sending', () => {
    expect(sendStatusOf(attempt('pending', false))).toBe('sending');
  });

  it('reports a confirmed send as sent', () => {
    expect(sendStatusOf(attempt('success', false))).toBe('sent');
  });

  it('reports a rejected send as failed', () => {
    expect(sendStatusOf(attempt('error', false))).toBe('failed');
  });
});

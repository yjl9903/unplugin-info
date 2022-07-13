import { describe, expect, it } from 'vitest';

import '../client.d';

describe('build timestamp', () => {
  it('should work', async () => {
    const timestamp = (await import('~build/time')).default;
    expect(timestamp).toBeInstanceOf(Date);
  });
});

describe('build info', () => {
  it('should work', async () => {
    const { github } = await import('~build/info');
    expect(github).toMatchInlineSnapshot('"https://github.com/yjl9903/vite-plugin-info"');
  });
});

describe('build meta', () => {
  it('should work', async () => {
    // @ts-ignore
    const { message } = await import('~build/meta');
    expect(message).toMatchInlineSnapshot('"This is set from vite.config.ts"');
  });
});

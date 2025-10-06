import { beforeAll, describe, expect, it } from 'vitest';

import '../client.d';

describe('build timestamp', () => {
  it('should work', async () => {
    const timestamp = (await import('~build/time')).default;
    expect(timestamp).toBeInstanceOf(Date);
  });
});

describe('build info', () => {
  it('should work', async () => {
    // @ts-ignore
    const { github } = await import('~build/info');
    expect(github).toMatchInlineSnapshot('"https://github.com/yjl9903/unplugin-info"');
  });

  it('should use git alias', async () => {
    const { github } = await import('~build/git');
    expect(github).toMatchInlineSnapshot('"https://github.com/yjl9903/unplugin-info"');
  });

  it('should expose git describe output', async () => {
    const info = await import('~build/git');
    expect(typeof info.describe).toBe('string');
    expect(info.describe?.length).toBeGreaterThan(0);
  });

  it('should infer CI', async () => {
    const ci = await import('ci-info');
    const { isCI, isPR, name } = await import('~build/ci');
    expect(isCI).toBe(ci.isCI);
    expect(isPR).toBe(ci.isPR);
    expect(name).toBe(ci.name);
  });
});

describe('build meta', () => {
  it('should work', async () => {
    // @ts-ignore
    const { message } = await import('~build/meta');
    expect(message).toMatchInlineSnapshot('"This is set from vite.config.ts"');
  });
});

describe('build env', () => {
  const MESSAGE = 'This is set from the vitest';

  beforeAll(() => {
    // @ts-ignore
    process.env.BUILD_MESSAGE = MESSAGE;
  });

  it('should work', async () => {
    // @ts-ignore
    const { BUILD_MESSAGE: message } = await import('~build/env');
    expect(message).toStrictEqual(MESSAGE);
  });
});

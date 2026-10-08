import { existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  CLIENTS,
  CLIENT_EXCLUSIONS,
  CLIENT_SOURCE_COUNT,
  getFeaturedClients,
} from '../../src/content/clients';

const assetDirectory = resolve(process.cwd(), 'src/assets/clients');

describe('draft client asset catalogue', () => {
  it('accounts for every supplied source file', () => {
    expect(CLIENT_SOURCE_COUNT).toBe(28);
    expect(CLIENTS.length + CLIENT_EXCLUSIONS.length).toBe(CLIENT_SOURCE_COUNT);
    expect(readdirSync(assetDirectory)).toHaveLength(CLIENTS.length);
  });

  it('has stable, unique, reviewable records', () => {
    expect(new Set(CLIENTS.map((client) => client.id)).size).toBe(CLIENTS.length);

    for (const client of CLIENTS) {
      expect(client.displayName.trim()).not.toBe('');
      expect(client.approval).toBe('draft');
      expect(existsSync(resolve(assetDirectory, client.sourceFile))).toBe(true);
      expect(client.displayName).not.toBe(client.sourceFile);
    }
  });

  it('curates a balanced homepage subset', () => {
    const featured = getFeaturedClients();
    expect(featured.length).toBeGreaterThanOrEqual(12);
    expect(featured.length).toBeLessThanOrEqual(16);
    expect(featured.every((client) => client.featured)).toBe(true);
  });

  it('documents every excluded source rather than silently dropping it', () => {
    for (const exclusion of CLIENT_EXCLUSIONS) {
      expect(exclusion.sourceFile.trim()).not.toBe('');
      expect(exclusion.reason.trim()).not.toBe('');
    }
  });
});

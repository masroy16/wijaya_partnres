import { existsSync, statSync } from 'node:fs';
import { extname, join } from 'node:path';
import { describe, expect, it } from 'vitest';

import { getAlternativeContent } from '../../src/content/alternative';

const publicRoot = join(process.cwd(), 'public');
const allowedExtensions = new Set(['.jpeg', '.jpg', '.png', '.webp']);

function toPublicFile(assetPath: string): string {
  return join(publicRoot, assetPath.replace(/^\//, ''));
}

describe('alternative visual assets', () => {
  it('keeps the three localized stories on the same visual assets', () => {
    const english = getAlternativeContent('en');
    const indonesian = getAlternativeContent('id');

    expect(indonesian.slides.map((slide) => slide.image)).toEqual(
      english.slides.map((slide) => slide.image),
    );
  });

  it('ships every referenced carousel and client image as a non-empty raster file', () => {
    const content = getAlternativeContent('en');
    const assetPaths = [
      '/assets/alternative/brand.jpeg',
      ...content.slides.map((slide) => slide.image),
      ...content.projects.marks.map((mark) => mark.image),
    ];

    for (const assetPath of assetPaths) {
      const file = toPublicFile(assetPath);
      expect(existsSync(file), `${assetPath} should exist`).toBe(true);
      expect(allowedExtensions.has(extname(file).toLowerCase())).toBe(true);
      expect(statSync(file).size, `${assetPath} should not be empty`).toBeGreaterThan(0);
    }
  });
});

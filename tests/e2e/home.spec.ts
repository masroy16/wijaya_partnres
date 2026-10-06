import { expect, test } from '@playwright/test';

const locales = [
  {
    path: '/id/',
    practices: ['Litigasi Komersial', 'Strategi Insolvensi dan Utang', 'Nasihat Korporasi', 'Jembatan Bandung dan Jakarta'],
  },
  {
    path: '/en/',
    practices: ['Commercial Litigation', 'Insolvency and Debt Strategy', 'Corporate Advisory', 'A Bridge from Bandung to Jakarta'],
  },
] as const;

test.describe('narrative homepage', () => {
  for (const { path, practices } of locales) {
    test(`renders the narrative in order for ${path}`, async ({ page }) => {
      await page.goto(path);

      await expect(page.getByRole('heading', { level: 1 })).toHaveText('Absolute Loyalty. Strategic Action.');
      const narrativeIds = await page.locator('main > section').evaluateAll((sections) =>
        sections.slice(0, 4).map((section) => section.id),
      );
      expect(narrativeIds).toEqual(['hero', 'legacy', 'expertise', 'ethics']);
      await expect(page.locator('body')).not.toContainText('37-Year Legacy');

      for (const practice of practices) {
        await expect(page.getByRole('heading', { level: 3, name: practice })).toBeVisible();
      }

      const images = page.locator('[data-narrative-image]');
      await expect(images).toHaveCount(4);
      for (let index = 0; index < 4; index += 1) {
        await expect(images.nth(index)).toHaveAttribute('width', /\d+/);
        await expect(images.nth(index)).toHaveAttribute('height', /\d+/);
      }
    });
  }

  test('keeps the complete narrative readable without JavaScript', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/');

    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.locator('#legacy')).toContainText('Founded in 1988');
    await expect(page.locator('#expertise')).toContainText('Commercial Litigation');
    await expect(page.locator('#ethics')).toContainText('Integrity and absolute loyalty');
    await context.close();
  });
});

import { expect, test, type Page } from '@playwright/test';

const teamMembers = [
  ['herman-wijaya', 'Herman Wijaya'],
  ['f-ebby-abraham', 'F. Ebby Abraham'],
  ['rani-sisco', 'Rani Sisco'],
  ['arifan-sudaryanto', 'Arifan Sudaryanto'],
  ['diana-pangestu', 'Diana Pangestu'],
  ['andi-cipta-lukmana', 'Andi Cipta Lukmana'],
] as const;

async function visitWithoutConsoleErrors(page: Page, path: string) {
  const consoleErrors: string[] = [];
  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });

  const response = await page.goto(path);
  expect(response?.status(), `${path} should return HTTP 200`).toBe(200);
  expect(consoleErrors, `${path} should not log console errors`).toEqual([]);
}

test.describe('coexisting design concepts', () => {
  for (const { path, locale } of [
    { path: '/id/', locale: 'id' },
    { path: '/en/', locale: 'en' },
  ]) {
    test(`keeps Concept 01 isolated at ${path}`, async ({ page }) => {
      await visitWithoutConsoleErrors(page, path);

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('[data-site-header]')).toHaveCount(1);
      await expect(page.locator('.alternative-site')).toHaveCount(0);
    });
  }

  for (const { path, locale } of [
    { path: '/alternative/', locale: 'en' },
    { path: '/alternative/id/', locale: 'id' },
  ]) {
    test(`keeps Concept 02 isolated at ${path}`, async ({ page }) => {
      await visitWithoutConsoleErrors(page, path);

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page.locator('.alternative-site')).toHaveCount(1);
      await expect(page.locator('[data-site-header] .brand')).toHaveCount(1);
      await expect(page.locator('[data-site-header] .wordmark')).toHaveCount(0);
    });
  }

  for (const basePath of ['/id/team/', '/en/team/', '/alternative/team/', '/alternative/id/team/']) {
    for (const [slug, name] of teamMembers) {
      const path = `${basePath}${slug}/`;
      test(`resolves the team profile ${path}`, async ({ page }) => {
        await visitWithoutConsoleErrors(page, path);
        await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
      });
    }
  }
});

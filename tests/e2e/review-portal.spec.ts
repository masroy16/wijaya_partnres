import { expect, test } from '@playwright/test';

const reviewLinks = ['/id/', '/en/', '/alternative/id/', '/alternative/'];

async function expectCompleteSelector(page: import('@playwright/test').Page) {
  await expect(page.getByRole('heading', { level: 1, name: 'Internal Design Review' })).toBeVisible();
  await expect(
    page.getByText('Halaman ini hanya untuk memilih konsep dan bukan bagian dari website Wijaya And Partners.'),
  ).toBeVisible();
  await expect(page.locator('[data-review-card]')).toHaveCount(2);
  await expect(page.locator('[data-review-thumbnail]')).toHaveCount(2);

  const links = page.locator('main a');
  await expect(links).toHaveCount(4);
  await expect(links.evaluateAll((items) => items.map((item) => item.getAttribute('href')))).resolves.toEqual(reviewLinks);
}

test('renders a neutral selector that is separate from both company-profile concepts', async ({ page }) => {
  const response = await page.goto('/');

  expect(response?.status()).toBe(200);
  await expectCompleteSelector(page);
  await expect(page.locator('[data-site-header], footer, [data-primary-navigation]')).toHaveCount(0);
  await expect(page.locator('img[src*="wijaya-partners-logo"], [data-brand-logo], [data-brand-lockup]')).toHaveCount(0);
  await expect(page.locator('[data-theme-toggle], .theme-toggle')).toHaveCount(0);
  await expect(page.locator('a[href^="mailto:"], a[href^="tel:"], a[href*="wa.me"]')).toHaveCount(0);
  await expect(page.locator('form')).toHaveCount(0);
  await expect(page.getByRole('button')).toHaveCount(0);
  await expect(page.getByText(/feedback|umpan balik/i)).toHaveCount(0);
});

test('keeps every destination keyboard reachable at a narrow zoom-equivalent viewport', async ({ page }) => {
  await page.setViewportSize({ width: 160, height: 284 });
  await page.goto('/');

  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);

  const focusedHrefs: string[] = [];
  for (let index = 0; index < reviewLinks.length; index += 1) {
    await page.keyboard.press('Tab');
    focusedHrefs.push(await page.evaluate(() => (document.activeElement as HTMLAnchorElement | null)?.getAttribute('href') ?? ''));
  }
  expect(focusedHrefs).toEqual(reviewLinks);
});

test('retains stable preview surfaces and usable links when thumbnails cannot load', async ({ page }) => {
  await page.route(/concept-0[12]/, (route) => route.abort());
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/');

  const previews = page.locator('[data-review-thumbnail]');
  await expect(previews).toHaveCount(2);
  const dimensions = await previews.evaluateAll((items) =>
    items.map((item) => ({ width: item.getBoundingClientRect().width, height: item.getBoundingClientRect().height })),
  );
  expect(dimensions.every(({ width, height }) => width > 0 && height > 0)).toBe(true);
  for (const href of reviewLinks) await expect(page.locator(`main a[href="${href}"]`)).toBeVisible();
});

test('remains complete without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();

  await page.goto('/');
  await expectCompleteSelector(page);
  await context.close();
});

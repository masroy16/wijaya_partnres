import { expect, test } from '@playwright/test';

test('reveals section content again when navigating away and returning', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/id/');

  const navigation = page.getByRole('navigation', { name: 'Navigasi utama' });
  const legacy = page.locator('#legacy');
  const contact = page.locator('#contact');

  await navigation.getByRole('link', { name: 'Kontak' }).click();
  await expect(contact).toHaveAttribute('data-section-visible', 'true');
  await expect(contact.locator('[data-section-content]')).toHaveCSS('opacity', '1');

  await navigation.getByRole('link', { name: 'Tentang Kami' }).click();
  await expect(legacy).toHaveAttribute('data-section-visible', 'true');
  await expect(contact).not.toHaveAttribute('data-section-visible', 'true');

  await navigation.getByRole('link', { name: 'Kontak' }).click();
  await expect(contact).toHaveAttribute('data-section-visible', 'true');
  await expect(contact.locator('[data-section-content]')).toHaveCSS('transform', 'none');
});

test('keeps marked section content visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/id/');

  const content = page.locator('[data-section-content]');
  expect(await content.count()).toBeGreaterThan(0);
  expect(
    await content.evaluateAll((elements) =>
      elements.every((element) => {
        const style = getComputedStyle(element);
        return style.opacity === '1' && style.visibility === 'visible';
      }),
    ),
  ).toBe(true);

  await context.close();
});

test('shows section content immediately when reduced motion is requested', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/id/');

  const content = page.locator('#hero [data-section-content]');
  await expect(content).toHaveCSS('opacity', '1');
  await expect(content).toHaveCSS('transform', 'none');
  expect(
    await content.evaluate((element) =>
      Math.max(...getComputedStyle(element).transitionDuration.split(',').map((value) => Number.parseFloat(value) || 0)),
    ),
  ).toBeLessThanOrEqual(0.01);
});

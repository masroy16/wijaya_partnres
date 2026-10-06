import { expect, test } from '@playwright/test';

for (const scenario of [
  { name: '320px viewport', width: 320, zoom: '1' },
  { name: '200% zoom equivalent', width: 640, zoom: '2' },
]) {
  test(`team cards reflow without clipping at ${scenario.name}`, async ({ page }) => {
    await page.setViewportSize({ width: scenario.width, height: 900 });
    await page.goto('/en/#team');
    await page.locator('html').evaluate((element, zoom) => {
      element.style.zoom = zoom;
    }, scenario.zoom);

    const cards = page.locator('[data-team-card]');
    await expect(cards).toHaveCount(6);
    const clipping = await cards.evaluateAll((elements) =>
      elements.some((card) => {
        const name = card.querySelector('[data-member-name]');
        const credentials = card.querySelector('[data-member-credentials]');
        return [name, credentials].some(
          (element) => element && (element.scrollWidth > element.clientWidth || element.getBoundingClientRect().right > window.innerWidth),
        );
      }),
    );

    expect(clipping).toBe(false);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  });
}

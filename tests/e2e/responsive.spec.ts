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

for (const viewport of [
  { width: 320, height: 568 },
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 900 },
  { width: 1920, height: 1080 },
]) {
  test(`homepage remains readable at ${viewport.width}x${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/en/');

    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const hero = page.locator('#hero');
    const heroImage = hero.locator('[data-narrative-image]');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(heroImage).toBeVisible();
    expect(await heroImage.evaluate((image) => image.getBoundingClientRect().width)).toBeGreaterThanOrEqual(viewport.width - 1);

    await page.locator('#contact').scrollIntoViewIfNeeded();
    await expect(page.locator('#contact')).toContainText('wnp@wijayapartners.com');
    await expect(page.locator('#contact')).toContainText('Komplek Surya Setra A3');

    const credentialBlocks = page.locator('[data-member-credentials]');
    expect(
      await credentialBlocks.evaluateAll((elements) =>
        elements.every((element) => element.scrollWidth <= element.clientWidth),
      ),
    ).toBe(true);
  });
}

test('floating WhatsApp does not cover the focused office-directions link', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/en/#contact');
  const map = page.getByRole('link', { name: 'Open directions' });
  await map.focus();
  const mapBox = await map.boundingBox();
  const floatingBox = await page.locator('[data-floating-whatsapp]').boundingBox();

  expect(mapBox).not.toBeNull();
  expect(floatingBox).not.toBeNull();
  const overlaps = Boolean(
    mapBox &&
      floatingBox &&
      mapBox.x < floatingBox.x + floatingBox.width &&
      mapBox.x + mapBox.width > floatingBox.x &&
      mapBox.y < floatingBox.y + floatingBox.height &&
      mapBox.y + mapBox.height > floatingBox.y,
  );
  expect(overlaps).toBe(false);
});

test('complete and pending profiles reflow at a 200% zoom equivalent', async ({ page }) => {
  await page.setViewportSize({ width: 640, height: 900 });
  for (const path of ['/en/team/f-ebby-abraham/', '/en/team/rani-sisco/']) {
    await page.goto(path);
    await page.locator('html').evaluate((element) => { element.style.zoom = '2'; });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  }
});

test('section navigation places the first legacy content close below the floating header', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/id/');
  await page.getByRole('navigation', { name: 'Navigasi utama' }).getByRole('link', { name: 'Tentang Kami' }).click();
  await expect(page).toHaveURL(/#legacy$/);

  await expect
    .poll(async () => {
      const header = await page.locator('[data-site-header]').boundingBox();
      const firstContent = await page.locator('#legacy .eyebrow').boundingBox();
      return header && firstContent ? Math.round(firstContent.y - (header.y + header.height)) : Number.POSITIVE_INFINITY;
    })
    .toBeLessThanOrEqual(80);
});

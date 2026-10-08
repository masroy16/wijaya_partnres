import { expect, test } from '@playwright/test';

test.describe('localized site shell', () => {
  for (const { path, locale, navName } of [
    { path: '/id/', locale: 'id', navName: 'Navigasi utama' },
    { path: '/en/', locale: 'en', navName: 'Primary navigation' },
  ]) {
    test(`renders the ${locale} route with section navigation`, async ({ page }) => {
      const consoleErrors: string[] = [];
      page.on('console', (message) => {
        if (message.type() === 'error') consoleErrors.push(message.text());
      });

      await page.goto(path);

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      if ((page.viewportSize()?.width ?? 0) < 1024) {
        await page.getByRole('button', { name: locale === 'id' ? 'Buka menu' : 'Open menu' }).click();
      }
      const navigation = page.getByRole('navigation', { name: navName });
      await expect(navigation).toBeVisible();
      await expect(navigation.locator('a[href="#legacy"]')).toBeVisible();
      await expect(navigation.locator('a[href="#contact"]')).toBeVisible();
      expect(consoleErrors).toEqual([]);
    });
  }

  test('moves keyboard focus to main content through the skip link', async ({ page, browserName }) => {
    test.skip(browserName === 'webkit', 'Headless WebKit follows the macOS preference that omits links from Tab navigation.');
    await page.goto('/id/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Lewati ke konten utama' })).toBeFocused();
    await page.keyboard.press('Enter');
    await expect(page.locator('#main-content')).toBeFocused();
  });

  test('switches the homepage to its equivalent locale', async ({ page }) => {
    await page.goto('/id/');
    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en\/$/);
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('uses the compact brand mark in navigation and the complete lockup in branded content', async ({ page }) => {
    await page.goto('/id/');

    const headerBrand = page.getByRole('link', { name: 'Wijaya And Partners — Beranda' });
    const compactMark = headerBrand.locator('[data-brand-mark]');
    await expect(compactMark).toBeVisible();
    await expect(compactMark).toHaveAttribute('alt', '');

    const heroLockup = page.locator('#hero [data-brand-lockup]');
    const footerLockup = page.locator('footer [data-brand-lockup]');
    await expect(heroLockup).toBeVisible();
    await expect(heroLockup).toHaveAttribute('alt', 'Wijaya & Partners');
    await expect(footerLockup).toBeVisible();
    await expect(footerLockup).toHaveAttribute('alt', 'Wijaya & Partners');

    const imageState = [];
    for (const image of [compactMark, heroLockup, footerLockup]) {
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.complete && element.naturalWidth > 0)).toBe(true);
      imageState.push(
        await image.evaluate((element: HTMLImageElement) => ({
          complete: element.complete,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
        })),
      );
    }

    expect(imageState.every(({ complete, naturalWidth, naturalHeight }) => complete && naturalWidth > 0 && naturalHeight > 0)).toBe(
      true,
    );
  });

  test('adds contrast to the complete logo text only in dark mode', async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem('wp-theme', 'light'));
    await page.goto('/id/');

    const contrastLayers = page.locator('[data-brand-lockup-contrast]');
    await expect(contrastLayers).toHaveCount(2);
    for (const layer of await contrastLayers.all()) await expect(layer).toBeHidden();

    await page.getByRole('button', { name: 'Gunakan tema gelap' }).click();
    for (const layer of await contrastLayers.all()) {
      await expect(layer).toBeVisible();
      expect(await layer.evaluate((element) => getComputedStyle(element).filter)).not.toBe('none');
    }
  });

  test('opens and closes the mobile menu with an exposed state', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/id/');
    const trigger = page.getByRole('button', { name: 'Buka menu' });

    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
    await trigger.click();
    const openTrigger = page.getByRole('button', { name: 'Tutup menu' });
    await expect(openTrigger).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Navigasi utama' })).toBeVisible();
    await openTrigger.click();
    await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  });
});

test.describe('theme behavior', () => {
  test('uses the system dark preference on a first visit', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.goto('/en/');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('persists an explicit theme choice across reloads', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.goto('/en/');
    await page.getByRole('button', { name: 'Use dark theme' }).click();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

    await page.reload();
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('ignores an invalid saved theme', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'dark' });
    await page.addInitScript(() => localStorage.setItem('wp-theme', 'sepia'));
    await page.goto('/en/');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  test('falls back safely when local storage is unavailable', async ({ page }) => {
    await page.emulateMedia({ colorScheme: 'light' });
    await page.addInitScript(() => {
      Object.defineProperty(window, 'localStorage', {
        get() {
          throw new Error('storage blocked');
        },
      });
    });
    await page.goto('/en/');

    await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await expect(page.getByRole('button', { name: 'Use dark theme' })).toBeVisible();
  });
});

test('keeps core navigation visible without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/en/');

  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  await expect(page.locator('a[href="#contact"]')).toBeVisible();
  await context.close();
});

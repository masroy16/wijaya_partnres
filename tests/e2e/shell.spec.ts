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
      const navigation = page.getByRole('navigation', { name: navName });
      await expect(navigation).toBeVisible();
      await expect(navigation.locator('a[href="#legacy"]')).toBeVisible();
      await expect(navigation.locator('a[href="#contact"]')).toBeVisible();
      expect(consoleErrors).toEqual([]);
    });
  }

  test('moves keyboard focus to main content through the skip link', async ({ page }) => {
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

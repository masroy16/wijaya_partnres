import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const axeScenarios = [
  { name: 'Indonesian home light', path: '/id/', theme: 'light' },
  { name: 'Indonesian home dark', path: '/id/', theme: 'dark' },
  { name: 'English home light', path: '/en/', theme: 'light' },
  { name: 'English home dark', path: '/en/', theme: 'dark' },
  { name: 'Herman profile', path: '/en/team/herman-wijaya/', theme: 'light' },
  { name: 'F. Ebby profile', path: '/id/team/f-ebby-abraham/', theme: 'dark' },
  { name: 'pending profile', path: '/en/team/rani-sisco/', theme: 'light' },
  { name: '404 page', path: '/not-a-real-page/', theme: 'light' },
] as const;

test.describe('axe accessibility audit', () => {
  for (const scenario of axeScenarios) {
    test(`${scenario.name} has no detectable WCAG A or AA violations`, async ({ page }) => {
      await page.addInitScript((theme) => localStorage.setItem('wp-theme', theme), scenario.theme);
      await page.goto(scenario.path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
        .analyze();

      expect(results.violations).toEqual([]);
    });
  }
});

test.describe('keyboard and motion behavior', () => {
  test('reaches every visible homepage action by keyboard', async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== 'chromium-desktop', 'One desktop engine exercises the complete deterministic tab sequence.');
    await page.goto('/en/');
    const focusable = page.locator('a[href], button:not([disabled])');
    const expectedIds = await focusable.evaluateAll((elements) =>
      elements
        .filter((element) => {
          const style = getComputedStyle(element);
          return style.display !== 'none' && style.visibility !== 'hidden' && !(element as HTMLElement).hidden && element.getClientRects().length > 0;
        })
        .map((element, index) => {
          const id = `focus-${index}`;
          (element as HTMLElement).dataset.focusAuditId = id;
          return id;
        }),
    );
    const reached = new Set<string>();

    for (let index = 0; index < expectedIds.length + 2; index += 1) {
      await page.keyboard.press('Tab');
      const id = await page.evaluate(() => (document.activeElement as HTMLElement)?.dataset.focusAuditId);
      if (id) reached.add(id);
    }

    expect([...reached].sort()).toEqual([...expectedIds].sort());
  });

  test('moves focus into the opened mobile menu and returns it on Escape', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/en/');
    const trigger = page.getByRole('button', { name: 'Open menu' });
    await trigger.click();

    await expect(page.getByRole('navigation', { name: 'Primary navigation' }).getByRole('link').first()).toBeFocused();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('keeps primary controls at least 44 CSS pixels', async ({ page }) => {
    await page.goto('/en/');
    const controls = page.locator(
      '.primary-navigation a, .locale-switcher, [data-theme-toggle], [data-clients-toggle], [data-floating-whatsapp]',
    );
    const undersized = await controls.evaluateAll((elements) =>
      elements
        .filter((element) => !((element as HTMLElement).hidden) && element.getClientRects().length > 0)
        .map((element) => ({
          label: element.getAttribute('aria-label') || element.textContent?.trim(),
          width: element.getBoundingClientRect().width,
          height: element.getBoundingClientRect().height,
        }))
        .filter(({ width, height }) => width < 44 || height < 44),
    );

    expect(undersized).toEqual([]);
  });

  test('honors reduced-motion preferences', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/en/');

    expect(await page.locator('html').evaluate((element) => getComputedStyle(element).scrollBehavior)).toBe('auto');
    const duration = await page.locator('[data-team-card]').first().evaluate((element) =>
      Math.max(...getComputedStyle(element).transitionDuration.split(',').map((value) => Number.parseFloat(value) || 0)),
    );
    expect(duration).toBeLessThanOrEqual(0.01);
  });
});

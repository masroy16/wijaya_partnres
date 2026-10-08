import { expect, test } from '@playwright/test';

test('marks the primary concept as a non-indexable preview', async ({ page }) => {
  await page.goto('/id/');
  await expect(page.locator('meta[name="robots"]')).toHaveCount(1);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
});

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

  test('uses relaxed tracking for every homepage display title', async ({ page }) => {
    await page.goto('/en/');
    const titles = page.locator('#hero-title, #legacy-title, #expertise-title, #ethics-title, #team-title, #clients-title, #contact-title');
    await expect(titles).toHaveCount(7);

    const trackingRatios = await titles.evaluateAll((elements) =>
      elements.map((element) => {
        const style = getComputedStyle(element);
        return Number.parseFloat(style.letterSpacing) / Number.parseFloat(style.fontSize);
      }),
    );

    expect(trackingRatios.every((ratio) => ratio >= -0.04)).toBe(true);
  });

  test('uses a restrained and consistent section-title scale on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/');

    const titles = page.locator('#legacy-title, #expertise-title, #ethics-title, #team-title, #clients-title, #contact-title');
    const fontSizes = await titles.evaluateAll((elements) =>
      elements.map((element) => Number.parseFloat(getComputedStyle(element).fontSize)),
    );

    expect(fontSizes).toHaveLength(6);
    expect(fontSizes.every((size) => size === 60)).toBe(true);
  });

  test('keeps the hero title at 90 pixels on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/');

    const heroTitle = page.locator('#hero-title');
    const desktopFontSize = await heroTitle.evaluate((element) =>
      Number.parseFloat(getComputedStyle(element).fontSize),
    );

    expect(desktopFontSize).toBe(90);

    await page.setViewportSize({ width: 1024, height: 900 });
    expect(await heroTitle.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize))).toBe(90);

    await page.setViewportSize({ width: 1023, height: 900 });
    const tabletFontSize = await heroTitle.evaluate((element) => Number.parseFloat(getComputedStyle(element).fontSize));
    expect(tabletFontSize).toBeGreaterThan(90);
    expect(tabletFontSize).toBeLessThan(93);
  });

  test('uses a brighter hero treatment in light mode and a dark scrim in dark mode', async ({ page }) => {
    const readTreatment = async () =>
      page.locator('#hero').evaluate((hero) => {
        const overlay = hero.querySelector('.hero__overlay');
        const background = overlay ? getComputedStyle(overlay).backgroundImage : '';
        const color = getComputedStyle(hero).color;
        const firstRgb = background.match(/rgba?\((\d+)[, ]+(\d+)[, ]+(\d+)/);
        const luminance = firstRgb
          ? (0.2126 * Number(firstRgb[1]) + 0.7152 * Number(firstRgb[2]) + 0.0722 * Number(firstRgb[3]))
          : 0;
        return { background, color, luminance };
      });

    await page.addInitScript(() => localStorage.setItem('wp-theme', 'light'));
    await page.goto('/en/');
    const light = await readTreatment();

    await page.getByRole('button', { name: 'Use dark theme' }).click();
    const dark = await readTreatment();

    expect(light.luminance).toBeGreaterThan(dark.luminance);
    expect(light.color).not.toBe(dark.color);
    expect(light.background).not.toBe(dark.background);
  });
});

test.describe('clients portfolio', () => {
  test('shows the featured set and progressively reveals the full usable portfolio', async ({ page }) => {
    await page.goto('/en/#clients');

    const cards = page.locator('[data-client-card]');
    await expect(cards).toHaveCount(27);
    await expect(page.locator('[data-client-card]:visible')).toHaveCount(14);

    const expand = page.getByRole('button', { name: 'View all clients' });
    await expect(expand).toHaveAttribute('aria-expanded', 'false');
    await expand.click();
    await expect(page.locator('[data-client-card]:visible')).toHaveCount(27);
    await expect(page.getByRole('button', { name: 'Show fewer clients' })).toHaveAttribute('aria-expanded', 'true');
  });

  test('shows every usable logo when JavaScript is unavailable', async ({ browser }) => {
    const context = await browser.newContext({ javaScriptEnabled: false });
    const page = await context.newPage();
    await page.goto('/en/#clients');

    await expect(page.locator('[data-client-card]:visible')).toHaveCount(27);
    await expect(page.getByRole('button', { name: 'View all clients' })).toBeHidden();
    await context.close();
  });

  test('keeps a failed logo tile stable and named', async ({ page }) => {
    await page.route('**/*kagum-group*', (route) => route.fulfill({ status: 404, body: '' }));
    await page.goto('/en/#clients');

    const tile = page.locator('[data-client-id="kagum-group"]');
    await expect(tile).toBeVisible();
    await expect(tile.getByText('Kagum Group', { exact: true })).toBeVisible();
    expect(await tile.evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(100);
  });
});

test.describe('contact, metadata, and preview safeguards', () => {
  test('renders every direct contact action without a form', async ({ page }) => {
    await page.goto('/en/#contact');
    const contact = page.locator('#contact');

    await expect(contact.getByRole('link', { name: /wnp@wijayapartners\.com/ })).toHaveAttribute(
      'href',
      'mailto:wnp@wijayapartners.com',
    );
    await expect(contact.getByRole('link', { name: '0898-6000-822', exact: true })).toHaveAttribute(
      'href',
      'tel:+628986000822',
    );
    await expect(contact.getByRole('link', { name: /WhatsApp/ })).toHaveAttribute(
      'href',
      'https://wa.me/628986000822',
    );
    await expect(contact).toContainText('09:00–17:00');
    await expect(contact).toContainText('Komplek Surya Setra A3');
    const map = contact.getByRole('link', { name: 'Open directions' });
    await expect(map).toHaveAttribute('target', '_blank');
    await expect(map).toHaveAttribute('rel', /noopener/);
    await expect(page.locator('[data-floating-whatsapp]')).toHaveAttribute(
      'href',
      'https://wa.me/628986000822',
    );
    await expect(contact.locator('form')).toHaveCount(0);
  });

  test('publishes localized metadata while keeping the concept preview noindex', async ({ page }) => {
    await page.goto('/en/');

    await expect(page).toHaveTitle('Wijaya And Partners | Bandung Law Firm');
    await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /concept preview/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      'href',
      'https://wijaya-partners-concept-preview.netlify.app/en/',
    );
    await expect(page.locator('link[rel="alternate"][hreflang="id"]')).toHaveAttribute(
      'href',
      'https://wijaya-partners-concept-preview.netlify.app/id/',
    );
    expect(await page.locator('script[type="application/ld+json"]').textContent()).toContain('LegalService');
  });

  test('keeps the preview label and legal disclaimer visible', async ({ page }) => {
    await page.goto('/id/');

    await expect(page.getByText('Concept Preview — konten belum disetujui untuk publikasi.')).toBeVisible();
    await expect(page.getByText(/bukan merupakan nasihat hukum/)).toBeVisible();
  });
});

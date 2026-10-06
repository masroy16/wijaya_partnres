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

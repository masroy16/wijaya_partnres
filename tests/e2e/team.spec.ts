import { expect, test } from '@playwright/test';

const members = [
  ['herman-wijaya', 'Herman Wijaya', 'S.H.'],
  ['f-ebby-abraham', 'F. Ebby Abraham', 'S.H., M.Kn., CLA., CPL., ACIArb.'],
  ['rani-sisco', 'Rani Sisco', 'S.H.'],
  ['arifan-sudaryanto', 'Arifan Sudaryanto', 'S.H.'],
  ['diana-pangestu', 'Diana Pangestu', 'S.H.'],
  ['andi-cipta-lukmana', 'Andi Cipta Lukmana', 'S.H.'],
] as const;

test.describe('team homepage section', () => {
  for (const locale of ['id', 'en'] as const) {
    test(`lists the six sourced members on ${locale}`, async ({ page }) => {
      await page.goto(`/${locale}/#team`);
      const cards = page.locator('[data-team-card]');
      await expect(cards).toHaveCount(6);

      for (const [slug, name, credentials] of members) {
        const card = cards.filter({ has: page.getByRole('heading', { name, exact: true }) });
        await expect(card).toContainText(credentials);
        await expect(card.getByRole('link')).toHaveAttribute('href', `/${locale}/team/${slug}/`);
      }
    });
  }
});

test.describe('localized team profiles', () => {
  test('renders complete draft details only for supplied profiles', async ({ page }) => {
    await page.goto('/en/team/herman-wijaya/');
    await expect(page.getByRole('heading', { level: 1, name: 'Herman Wijaya' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Education' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Professional organizations' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Practice areas' })).toBeVisible();
    await expect(page.locator('main')).toContainText('Parahyangan Catholic University');

    await page.goto('/id/team/f-ebby-abraham/');
    await expect(page.getByRole('heading', { level: 1, name: 'F. Ebby Abraham' })).toBeVisible();
    await expect(page.locator('main')).toContainText('Universitas Padjadjaran');
    await expect(page.locator('main')).toContainText('ejaan nama lengkap ini masih memerlukan konfirmasi');
  });

  for (const [slug, name] of members.slice(2)) {
    test(`discloses the pending state for ${name}`, async ({ page }) => {
      await page.goto(`/en/team/${slug}/`);
      await expect(page.getByRole('heading', { level: 1, name })).toBeVisible();
      await expect(page.getByText('A complete profile is being prepared.')).toBeVisible();
      await expect(page.getByRole('heading', { name: 'Education' })).toHaveCount(0);
      const structuredData = await page.locator('script[type="application/ld+json"]').allTextContents();
      expect(structuredData.join(' ')).not.toContain('Person');
    });
  }

  test('preserves profile context across locale switching and returns to the team section', async ({ page }) => {
    await page.goto('/id/team/herman-wijaya/');
    await page.getByRole('link', { name: 'English' }).click();
    await expect(page).toHaveURL(/\/en\/team\/herman-wijaya\/$/);
    await expect(page.getByRole('link', { name: 'Back to our team' })).toHaveAttribute('href', '/en/#team');
  });
});

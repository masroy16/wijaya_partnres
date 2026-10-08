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

  test('keeps desktop team cards compact without clipping member details', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/#team');

    const cards = page.locator('[data-team-card]');
    const cardHeights = await cards.evaluateAll((elements) =>
      elements.map((element) => element.getBoundingClientRect().height),
    );
    const detailsAreVisible = await cards.evaluateAll((elements) =>
      elements.every((card) => {
        const details = card.querySelector('.team-card__details');
        const name = card.querySelector('[data-member-name]');
        const credentials = card.querySelector('[data-member-credentials]');

        if (!(details instanceof HTMLElement) || !(name instanceof HTMLElement) || !(credentials instanceof HTMLElement)) {
          return false;
        }

        const detailsBox = details.getBoundingClientRect();
        return [name, credentials].every((element) => {
          const box = element.getBoundingClientRect();
          return box.left >= detailsBox.left && box.right <= detailsBox.right && box.bottom <= detailsBox.bottom;
        });
      }),
    );

    expect(cardHeights).toHaveLength(6);
    expect(Math.max(...cardHeights)).toBeLessThanOrEqual(460);
    expect(detailsAreVisible).toBe(true);
  });
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

  test('keeps the first profile details discoverable below a compact hero', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/en/team/herman-wijaya/');

    const hero = await page.locator('.profile__hero').boundingBox();
    const back = await page.getByRole('link', { name: 'Back to our team' }).boundingBox();
    const biography = await page.getByRole('heading', { name: 'Profile', exact: true }).boundingBox();

    expect(hero).not.toBeNull();
    expect(back).not.toBeNull();
    expect(biography).not.toBeNull();
    expect(hero?.height ?? Number.POSITIVE_INFINITY).toBeLessThanOrEqual(500);
    expect(back && hero ? back.y - (hero.y + hero.height) : Number.POSITIVE_INFINITY).toBeLessThanOrEqual(40);
    expect(back && biography ? biography.y - (back.y + back.height) : Number.POSITIVE_INFINITY).toBeLessThanOrEqual(56);
    expect(biography?.y ?? Number.POSITIVE_INFINITY).toBeLessThan(900);
  });

  test('places the draft publication notice after all complete profile details', async ({ page }) => {
    await page.goto('/en/team/herman-wijaya/');

    const practices = await page.getByRole('heading', { name: 'Practice areas' }).boundingBox();
    const notice = await page.getByText('Draft profile — confirmation required before publication.').boundingBox();

    expect(practices).not.toBeNull();
    expect(notice).not.toBeNull();
    expect(notice && practices ? notice.y - practices.y : Number.NEGATIVE_INFINITY).toBeGreaterThan(0);
  });

  test('keeps pending profile content close to the return link', async ({ page }) => {
    await page.goto('/en/team/rani-sisco/');

    const back = await page.getByRole('link', { name: 'Back to our team' }).boundingBox();
    const pending = await page.getByRole('heading', { name: 'A complete profile is being prepared.' }).boundingBox();

    expect(back).not.toBeNull();
    expect(pending).not.toBeNull();
    expect(back && pending ? pending.y - (back.y + back.height) : Number.POSITIVE_INFINITY).toBeLessThanOrEqual(56);
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

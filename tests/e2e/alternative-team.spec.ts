import { expect, test } from '@playwright/test';

test('opens a localized profile from an alternative team card', async ({ page }) => {
  await page.goto('/alternative/');
  await page.getByRole('link', { name: /Herman Wijaya/ }).click();

  await expect(page).toHaveURL(/\/alternative\/team\/herman-wijaya\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Herman Wijaya' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Back to our team' })).toHaveAttribute('href', '/alternative/#team');
});

test('shows supplied profile sections and the Ebby source-name caveat', async ({ page }) => {
  await page.goto('/alternative/team/herman-wijaya/');

  await expect(page.getByText('Source Draft', { exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Education', exact: true })).toBeVisible();
  await expect(page.getByText('Faculty of Law, Parahyangan Catholic University, S.H., 1973.')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Practice areas', exact: true })).toBeVisible();

  await page.goto('/alternative/team/f-ebby-abraham/');
  await expect(page.getByRole('heading', { level: 1, name: 'F. Ebby Abraham' })).toBeVisible();
  await expect(page.getByText(/source narrative uses the name “Franz”/)).toBeVisible();
  await expect(page.getByText('Master of Notarial Law, Padjadjaran University, M.Kn., 2006.')).toBeVisible();
});

test('visibly discloses dummy content on placeholder profiles', async ({ page }) => {
  await page.goto('/alternative/team/rani-sisco/');

  await expect(page.getByRole('heading', { level: 1, name: 'Rani Sisco' })).toBeVisible();
  await expect(page.getByText('Draft / Placeholder Content', { exact: true })).toBeVisible();
  await expect(page.getByText(/Dummy placeholder content for design review only/)).toBeVisible();
});

test('retains the member and locale across profile navigation', async ({ page }) => {
  await page.goto('/alternative/team/herman-wijaya/');

  if (await page.locator('[data-menu-toggle]').isVisible()) {
    await page.locator('[data-menu-toggle]').click();
  }
  await expect(page.getByRole('link', { name: 'About', exact: true })).toHaveAttribute('href', '/alternative/#about');
  await expect(page.getByRole('link', { name: 'Our Teams', exact: true })).toHaveAttribute('href', '/alternative/#team');
  await page.getByRole('link', { name: 'View in Indonesian' }).click();

  await expect(page).toHaveURL(/\/alternative\/id\/team\/herman-wijaya\/$/);
  await expect(page.getByRole('heading', { level: 1, name: 'Herman Wijaya' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Kembali ke tim kami' })).toHaveAttribute('href', '/alternative/id/#team');
  await expect(page.getByRole('link', { name: 'Tentang Kami', exact: true })).toHaveAttribute('href', '/alternative/id/#about');
});

test('wraps previous and next counsel navigation at both ends', async ({ page }) => {
  await page.goto('/alternative/team/herman-wijaya/');

  await expect(page.getByRole('link', { name: 'Previous counsel: Andi Cipta Lukmana' })).toHaveAttribute('href', '/alternative/team/andi-cipta-lukmana/');
  await expect(page.getByRole('link', { name: 'Next counsel: F. Ebby Abraham' })).toHaveAttribute('href', '/alternative/team/f-ebby-abraham/');

  await page.goto('/alternative/team/andi-cipta-lukmana/');
  await expect(page.getByRole('link', { name: 'Next counsel: Herman Wijaya' })).toHaveAttribute('href', '/alternative/team/herman-wijaya/');
});

test('keeps mobile profile content ordered and inside a 320px viewport', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto('/alternative/team/f-ebby-abraham/');

  const layout = await page.locator('.profile-page').evaluate((profile) => {
    const credentials = profile.querySelector<HTMLElement>('.profile-intro__credentials');
    const sectionTops = Array.from(profile.querySelectorAll<HTMLElement>('.profile-section'))
      .map((section) => section.getBoundingClientRect().top);
    return {
      noOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
      credentialsContained: Boolean(
        credentials
        && credentials.getBoundingClientRect().left >= 0
        && credentials.getBoundingClientRect().right <= window.innerWidth,
      ),
      ordered: sectionTops.every((top, index) => index === 0 || top > sectionTops[index - 1]!),
    };
  });

  expect(layout).toEqual({ noOverflow: true, credentialsContained: true, ordered: true });

  await page.goto('/alternative/team/rani-sisco/');
  await expect(page.getByText('Draft / Placeholder Content', { exact: true })).toBeVisible();
  await expect(page.getByText(/Dummy placeholder content for design review only/)).toBeVisible();
});

test('gives profile controls visible focus and usable touch height', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto('/alternative/team/herman-wijaya/');

  const backLink = page.getByRole('link', { name: 'Back to our team' });
  await backLink.focus();
  const focusStyle = await backLink.evaluate((link) => {
    const style = getComputedStyle(link);
    return { style: style.outlineStyle, width: Number.parseFloat(style.outlineWidth) };
  });
  expect(focusStyle.style).not.toBe('none');
  expect(focusStyle.width).toBeGreaterThanOrEqual(2);

  const controlHeights = await page.locator('.profile-contact-link, .profile-pagination a').evaluateAll((links) =>
    links.map((link) => link.getBoundingClientRect().height),
  );
  expect(controlHeights.every((height) => height >= 40)).toBe(true);
});

test('renders a visible keyboard focus treatment inside linked team cards', async ({ page }) => {
  await page.goto('/alternative/');
  await page.addStyleTag({ content: '.team-card__link::after { display: none !important; }' });

  const card = page.locator('.team-card').first();
  const link = card.locator('.team-card__link');
  const beforeFocus = await card.screenshot();

  await link.focus();
  await expect(link).toBeFocused();
  const afterFocus = await card.screenshot();

  expect(Buffer.compare(beforeFocus, afterFocus)).not.toBe(0);
});

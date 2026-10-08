import { expect, test, type Page } from '@playwright/test';

const activeSlideId = async (page: Page) =>
  page.locator('[data-slide].is-active').getAttribute('data-slide-id');

test('renders one three-story carousel and only the approved primary navigation', async ({ page }) => {
  await page.goto('/alternative/');

  await expect(page.locator('[data-carousel]')).toHaveCount(1);
  await expect(page.locator('[data-carousel] [data-slide]')).toHaveCount(3);
  if (await page.locator('[data-menu-toggle]').isVisible()) {
    await page.locator('[data-menu-toggle]').click();
  }
  for (const label of ['About', 'Our Teams', 'Our Projects', 'Contact']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toHaveCount(1);
  }
});

test('keeps the complete Wijaya & Partners identity unified across desktop and mobile', async ({ page }) => {
  await page.goto('/alternative/');

  const mark = page.locator('.brand img');
  const wordmark = page.locator('.brand__wordmark');
  await expect(mark).toHaveAttribute('src', '/assets/alternative/wijaya-partners-mark.png');
  await expect.poll(() => mark.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
  await expect(wordmark).toHaveText('WIJAYA & PARTNERS');
  await expect(wordmark).toBeVisible();

  await page.setViewportSize({ width: 320, height: 760 });
  await expect(wordmark).toBeVisible();
  const geometry = await page.locator('.site-header').evaluate((header) => {
    const brand = header.querySelector<HTMLElement>('.brand');
    const label = header.querySelector<HTMLElement>('.brand__wordmark');
    const headerRect = header.getBoundingClientRect();
    const brandRect = brand?.getBoundingClientRect();
    const labelRect = label?.getBoundingClientRect();
    return {
      contained: Boolean(
        brandRect
        && labelRect
        && brandRect.left >= headerRect.left
        && brandRect.right <= headerRect.right
        && labelRect.right <= headerRect.right
      ),
      noOverflow: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
    };
  });

  expect(geometry.contained).toBe(true);
  expect(geometry.noOverflow).toBe(true);
});

test('supports manual next, previous, and wrapping transitions', async ({ page }) => {
  await page.goto('/alternative/');

  await expect.poll(() => activeSlideId(page)).toBe('hero');
  await page.locator('[data-next]').click();
  await expect.poll(() => activeSlideId(page)).toBe('expertise');
  await page.locator('[data-previous]').click();
  await expect.poll(() => activeSlideId(page)).toBe('hero');
  await page.locator('[data-previous]').click();
  await expect.poll(() => activeSlideId(page)).toBe('values');
  await page.locator('[data-next]').click();
  await expect.poll(() => activeSlideId(page)).toBe('hero');
});

test('advances automatically and respects the manual pause control', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'desktop timer coverage is sufficient');
  await page.goto('/alternative/');
  await page.mouse.move(8, 8);

  await expect.poll(() => activeSlideId(page), { timeout: 8_000 }).toBe('expertise');
  await page.locator('[data-pause]').click();
  await page.mouse.move(8, 8);
  const pausedAt = await activeSlideId(page);
  await page.waitForTimeout(6_800);
  expect(await activeSlideId(page)).toBe(pausedAt);
  await expect(page.locator('[data-pause]')).toHaveAttribute('aria-pressed', 'true');
});

test('pauses automatic movement while a carousel control has focus', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'desktop focus coverage is sufficient');
  await page.goto('/alternative/');
  await page.locator('[data-next]').focus();
  const focusedAt = await activeSlideId(page);
  await page.waitForTimeout(6_800);

  expect(await activeSlideId(page)).toBe(focusedAt);
});

test('disables automatic movement for reduced-motion visitors', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'desktop reduced-motion coverage is sufficient');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/alternative/');
  await page.mouse.move(8, 8);
  const initial = await activeSlideId(page);
  await page.waitForTimeout(6_800);

  expect(await activeSlideId(page)).toBe(initial);
});

test('switches between the English and Indonesian alternatives', async ({ page }) => {
  await page.goto('/alternative/');
  await page.locator('.language-toggle').click();

  await expect(page).toHaveURL(/\/alternative\/id\/$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'id');
  if (await page.locator('[data-menu-toggle]').isVisible()) {
    await page.locator('[data-menu-toggle]').click();
  }
  for (const label of ['Tentang Kami', 'Tim Kami', 'Proyek Kami', 'Kontak']) {
    await expect(page.getByRole('link', { name: label, exact: true })).toHaveCount(1);
  }
});

test('opens the compact navigation and reflows without horizontal overflow at the 320px zoom-equivalent width', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto('/alternative/');
  const menu = page.locator('[data-menu-toggle]');

  await expect(menu).toBeVisible();
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#primary-navigation')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
});

test('keeps anchored section headings below the fixed mobile header', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto('/alternative/');
  await page.locator('[data-menu-toggle]').click();
  await page.getByRole('link', { name: 'Contact', exact: true }).click();

  await expect.poll(
    () => page.locator('#contact').evaluate((element) => Math.round(element.getBoundingClientRect().top)),
    { timeout: 4_000 },
  ).toBeLessThan(190);
  const settledTop = await page.locator('#contact').evaluate((element) => element.getBoundingClientRect().top);
  expect(settledTop).toBeGreaterThanOrEqual(118);
});

test('supports a real horizontal touch swipe on mobile', async ({ page, context }, testInfo) => {
  test.skip(!testInfo.project.name.includes('mobile'), 'real touch input requires the mobile project');
  await page.goto('/alternative/');
  const client = await context.newCDPSession(page);

  await client.send('Input.dispatchTouchEvent', {
    type: 'touchStart',
    touchPoints: [{ x: 310, y: 420 }],
  });
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: 210, y: 420 }],
  });
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchMove',
    touchPoints: [{ x: 80, y: 420 }],
  });
  await client.send('Input.dispatchTouchEvent', {
    type: 'touchEnd',
    touchPoints: [],
  });

  await expect.poll(() => activeSlideId(page)).toBe('expertise');
});

test('keeps localized slide copy above the carousel controls at short viewports', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes('mobile'), 'short desktop and tablet widths are covered here');
  await page.emulateMedia({ reducedMotion: 'reduce' });

  for (const route of ['/alternative/', '/alternative/id/']) {
    for (const width of [1440, 768]) {
      await page.setViewportSize({ width, height: 760 });
      await page.goto(route);

      for (let index = 0; index < 3; index += 1) {
        await page.locator(`[data-slide-to="${index}"]`).click();
        await expect.poll(() => page.locator('[data-slide].is-active').evaluate(
          (slide) => getComputedStyle(slide).transform,
        )).toBe('matrix(1, 0, 0, 1, 0, 0)');
        const geometry = await page.locator('[data-carousel]').evaluate((carousel) => {
          const active = carousel.querySelector<HTMLElement>('[data-slide].is-active');
          const copy = active?.querySelector<HTMLElement>('.story-slide__copy');
          const controls = carousel.querySelector<HTMLElement>('.story-carousel__controls');
          if (!active || !copy || !controls) return null;
          return {
            copyBottom: copy.getBoundingClientRect().bottom,
            controlsTop: controls.getBoundingClientRect().top,
            slideBottom: active.getBoundingClientRect().bottom,
            carouselBottom: carousel.getBoundingClientRect().bottom,
          };
        });

        expect(geometry).not.toBeNull();
        expect(geometry!.copyBottom + 16).toBeLessThanOrEqual(geometry!.controlsTop);
        expect(geometry!.slideBottom).toBeLessThanOrEqual(geometry!.carouselBottom + 1);
      }
    }
  }
});

test('keeps the pause control as the topmost hit target on a narrow carousel', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 760 });
  await page.goto('/alternative/');
  await page.evaluate(() => window.scrollTo(0, 60));

  const pauseIsTopmost = await page.locator('[data-pause]').evaluate((pause) => {
    const rect = pause.getBoundingClientRect();
    const hit = document.elementFromPoint(rect.left + rect.width / 2, rect.top + rect.height / 2);
    return hit === pause || Boolean(hit?.closest('[data-pause]'));
  });

  expect(pauseIsTopmost).toBe(true);
});

test('gives carousel indicators an opaque high-contrast control surface', async ({ page }) => {
  await page.goto('/alternative/');
  await page.locator('[data-slide-to="2"]').click();

  const contrast = await page.locator('.story-carousel__controls').evaluate((controls) => {
    const parse = (value: string) => value.match(/[\d.]+/g)?.map(Number) ?? [];
    const [red = 0, green = 0, blue = 0, alpha = 1] = parse(getComputedStyle(controls).backgroundColor);
    const [textRed = 255, textGreen = 255, textBlue = 255] = parse(getComputedStyle(controls).color);
    const luminance = (channels: number[]) => {
      const linear = channels.map((channel) => {
        const normalized = channel / 255;
        return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
      });
      return 0.2126 * linear[0]! + 0.7152 * linear[1]! + 0.0722 * linear[2]!;
    };
    const background = luminance([red, green, blue]);
    const foreground = luminance([textRed, textGreen, textBlue]);
    return { alpha, ratio: (Math.max(background, foreground) + 0.05) / (Math.min(background, foreground) + 0.05) };
  });

  expect(contrast.alpha).toBe(1);
  expect(contrast.ratio).toBeGreaterThanOrEqual(4.5);
});

test('preserves readable structure when carousel imagery is unavailable', async ({ page }) => {
  await page.route('**/assets/alternative/*', (route) => {
    if (route.request().resourceType() === 'image') return route.abort();
    return route.continue();
  });
  await page.goto('/alternative/');

  await expect(page.locator('[data-slide-id="hero"] h1')).toContainText('Absolute Loyalty');
  expect(await page.locator('[data-carousel]').evaluate((element) => element.getBoundingClientRect().height)).toBeGreaterThan(600);
});

test('keeps every story and core section available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 760 },
  });
  const page = await context.newPage();
  await page.goto('/alternative/');

  await expect(page.locator('[data-slide]')).toHaveCount(3);
  expect(await page.locator('[data-slide]').evaluateAll((slides) => slides.every((slide) => getComputedStyle(slide).position === 'relative'))).toBe(true);
  await expect(page.locator('#primary-navigation')).toBeVisible();
  await expect(page.getByRole('link', { name: 'About', exact: true })).toBeVisible();
  await expect(page.locator('#about')).toBeVisible();
  await expect(page.locator('#team')).toBeVisible();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();
  await context.close();
});

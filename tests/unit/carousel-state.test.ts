import { describe, expect, it } from 'vitest';

import {
  canAutoAdvance,
  nextSlide,
  previousSlide,
  wrapSlide,
  type CarouselInteractionState,
} from '../../src/lib/carousel-state';

const activeState: CarouselInteractionState = {
  manuallyPaused: false,
  hovered: false,
  focusWithin: false,
  touching: false,
  documentHidden: false,
  reducedMotion: false,
};

describe('carousel index transitions', () => {
  it('wraps forward from the final slide to the first', () => {
    expect(nextSlide(2, 3)).toBe(0);
  });

  it('wraps backward from the first slide to the final slide', () => {
    expect(previousSlide(0, 3)).toBe(2);
  });

  it.each([
    [-7, 3, 2],
    [-1, 3, 2],
    [3, 3, 0],
    [8, 3, 2],
  ])('normalizes index %s within %s slides', (index, count, expected) => {
    expect(wrapSlide(index, count)).toBe(expected);
  });

  it('returns the first slide when a non-positive slide count is received', () => {
    expect(wrapSlide(5, 0)).toBe(0);
  });
});

describe('carousel automatic advancement', () => {
  it('advances only when no interaction condition blocks it', () => {
    expect(canAutoAdvance(activeState)).toBe(true);
  });

  it.each<keyof CarouselInteractionState>([
    'manuallyPaused',
    'hovered',
    'focusWithin',
    'touching',
    'documentHidden',
    'reducedMotion',
  ])('stops when %s is active', (condition) => {
    expect(canAutoAdvance({ ...activeState, [condition]: true })).toBe(false);
  });

  it('keeps manual index transitions independent from automatic pause state', () => {
    expect(canAutoAdvance({ ...activeState, manuallyPaused: true })).toBe(false);
    expect(nextSlide(1, 3)).toBe(2);
    expect(previousSlide(1, 3)).toBe(0);
  });
});

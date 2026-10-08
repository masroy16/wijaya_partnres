export interface CarouselInteractionState {
  manuallyPaused: boolean;
  hovered: boolean;
  focusWithin: boolean;
  touching: boolean;
  documentHidden: boolean;
  reducedMotion: boolean;
}

export function wrapSlide(index: number, count: number): number {
  const safeCount = Math.trunc(count);
  if (safeCount <= 0 || !Number.isFinite(index)) {
    return 0;
  }

  const integerIndex = Math.trunc(index);
  return ((integerIndex % safeCount) + safeCount) % safeCount;
}

export function nextSlide(index: number, count: number): number {
  return wrapSlide(index + 1, count);
}

export function previousSlide(index: number, count: number): number {
  return wrapSlide(index - 1, count);
}

export function canAutoAdvance(state: CarouselInteractionState): boolean {
  return !Object.values(state).some(Boolean);
}

import { TEAM_SLUGS } from '../content/team';
import type { Locale } from './types';

const TEAM_PATH = /^\/(?:id|en)\/team\/([^/]+)\/?$/;
const HOME_PATH = /^\/(?:id|en)\/?$/;

export function getAlternatePath(pathname: string, targetLocale: Locale): string {
  if (HOME_PATH.test(pathname)) {
    return `/${targetLocale}/`;
  }

  const match = pathname.match(TEAM_PATH);
  const slug = match?.[1];
  if (slug && TEAM_SLUGS.includes(slug as (typeof TEAM_SLUGS)[number])) {
    return `/${targetLocale}/team/${slug}/`;
  }

  return `/${targetLocale}/`;
}

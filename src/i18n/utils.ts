import en from './en.json';
import pl from './pl.json';

export type Locale = 'en' | 'pl';

const dictionaries = { en, pl } as const;

export function t(locale: Locale) {
  return dictionaries[locale];
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'en' ? 'pl' : 'en';
}

export function localePath(locale: Locale, path: string = ''): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return locale === 'en' ? clean || '/' : `/pl${clean === '/' ? '' : clean}`;
}

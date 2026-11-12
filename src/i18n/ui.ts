// Языки, адреса страниц и структура текстов сайта.
// Сами тексты лежат в src/content/site/<язык>.json и редактируются в админке (/keystatic).
// Эстонский текст стоит показать носителю языка перед запуском.

import et from '../content/site/et.json';
import ru from '../content/site/ru.json';
import en from '../content/site/en.json';

export const languages = {
  et: 'ET',
  ru: 'RU',
  en: 'EN',
} as const;

export type Lang = keyof typeof languages;

export const languageNames: Record<Lang, string> = {
  et: 'Eesti',
  ru: 'Русский',
  en: 'English',
};

export const langPath: Record<Lang, string> = {
  et: '/',
  ru: '/ru/',
  en: '/en/',
};

export const privacyPath: Record<Lang, string> = {
  et: '/privacy/',
  ru: '/ru/privacy/',
  en: '/en/privacy/',
};

type Item = { title: string; text: string };

export interface Dict {
  meta: { title: string; description: string };
  nav: { services: string; why: string; demo: string; call: string; contact: string };
  cta: { lead: string; call: string };
  hero: { title: string; subtitle: string };
  services: { title: string; items: Item[] };
  why: { title: string; items: Item[] };
  demo: { title: string; note: string; badge: string; items: Item[] };
  call: { title: string; text: string; button: string };
  contact: {
    title: string;
    text: string;
    name: string;
    contact: string;
    task: string;
    submit: string;
    consent: string;
    messengers: string;
    sending: string;
    success: string;
    error: string;
  };
  footer: { privacy: string; cookies: string; regCode: string };
  cookie: { text: string; accept: string; decline: string; more: string };
  legal: { back: string };
  themes: { label: string; light: string; dark: string; emerald: string; violet: string };
}

export const themeIds = ['light', 'dark', 'emerald', 'violet'] as const;
export type ThemeId = (typeof themeIds)[number];

export const ui: Record<Lang, Dict> = { et, ru, en };

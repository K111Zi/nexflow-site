// Языки, страницы, адреса и структура текстов сайта NQO.
// Сами тексты лежат в src/content/site/<язык>.json и редактируются в админке (/keystatic).
// Эстонский и английский — черновики перевода, стоит показать носителям языка.

import et from '../content/site/et.json';
import ru from '../content/site/ru.json';
import en from '../content/site/en.json';

export const languages = {
  et: 'ET',
  ru: 'RU',
  en: 'EN',
} as const;

export type Lang = keyof typeof languages;
export const langs = Object.keys(languages) as Lang[];

export const languageNames: Record<Lang, string> = {
  et: 'Eesti',
  ru: 'Русский',
  en: 'English',
};

/** Страницы сайта. home — главная (/ru/), остальные — /ru/<ключ>/. */
export const pageKeys = ['home', 'solutions', 'process', 'projects', 'about', 'contact', 'privacy'] as const;
export type PageKey = (typeof pageKeys)[number];

export const pagePath = (lang: Lang, page: PageKey) => (page === 'home' ? `/${lang}/` : `/${lang}/${page}/`);

/** Адреса одной и той же страницы на всех языках — для hreflang и переключателя языка. */
export const pageAlternates = (page: PageKey) =>
  Object.fromEntries(langs.map((l) => [l, pagePath(l, page)])) as Record<Lang, string>;

export const langPath: Record<Lang, string> = pageAlternates('home');
export const privacyPath: Record<Lang, string> = pageAlternates('privacy');

/** Демо-сценарии: ключ задаёт картинку на карточке. */
export const demoKeys = ['inbox', 'chat', 'integration'] as const;
export type DemoKey = (typeof demoKeys)[number];

type Item = { title: string; text: string };
type Intro = { title: string; description: string; eyebrow: string; heading: string; lead: string; aside: string };

export interface Dict {
  nav: { home: string; solutions: string; process: string; projects: string; about: string; contact: string; cta: string };
  ui: {
    menuOpen: string;
    menuClose: string;
    themeToLight: string;
    themeToDark: string;
    language: string;
    mainNav: string;
    footerNav: string;
  };
  home: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    lead: string;
    ctaPrimary: string;
    ctaSecondary: string;
    bubble: string;
    robotAlt: string;
    services: Item[];
    problemsEyebrow: string;
    problemsTitle: string;
    problemsLead: string;
    problems: Item[];
    approachEyebrow: string;
    approachTitle: string;
    approachLead: string;
    approach: { label: string; title: string; text: string }[];
    approachCta: string;
    demosEyebrow: string;
    demosTitle: string;
    demosLead: string;
  };
  solutions: Intro & {
    groupEyebrow: string;
    groups: { title: string; text: string; items: Item[] }[];
    exampleLink: string;
    noteTitle: string;
    note: string;
  };
  process: Intro & {
    stepsEyebrow: string;
    steps: Item[];
    principlesEyebrow: string;
    principlesTitle: string;
    principles: Item[];
  };
  projects: Intro & { tagline: string };
  about: Intro & {
    word: string;
    tagline: string[];
    valuesEyebrow: string;
    valuesTitle: string;
    values: Item[];
    note: string;
  };
  contact: {
    title: string;
    description: string;
    eyebrow: string;
    heading: string;
    lead: string;
    howTitle: string;
    howText: string;
    channelsTitle: string;
    bookCall: string;
    formEyebrow: string;
    formTitle: string;
    name: string;
    namePlaceholder: string;
    company: string;
    companyPlaceholder: string;
    contact: string;
    contactPlaceholder: string;
    interest: string;
    interestPlaceholder: string;
    interestOptions: string[];
    task: string;
    taskPlaceholder: string;
    consentBefore: string;
    consentLink: string;
    submit: string;
    sending: string;
    success: string;
    error: string;
    invalid: string;
  };
  demos: {
    tag: string;
    open: string;
    modalEyebrow: string;
    modalNote: string;
    step: string;
    prev: string;
    next: string;
    restart: string;
    close: string;
    items: { key: DemoKey; title: string; intro: string; steps: Item[] }[];
  };
  cta: { title: string; text: string; button: string };
  footer: { eyebrow: string; title: string; button: string; privacy: string; cookies: string; regCode: string; tagline: string; motto: string };
  cookie: { text: string; accept: string; decline: string; more: string };
  legal: { eyebrow: string };
  helper: {
    trigger: string;
    name: string;
    subtitle: string;
    intro: string;
    shortcuts: { label: string; page: PageKey }[];
    inputLabel: string;
    placeholder: string;
    send: string;
    empty: string;
    fallback: string;
    go: string;
    close: string;
    disclaimer: string;
    answers: { keywords: string; text: string; page: PageKey }[];
  };
}

export const ui = { et, ru, en } as unknown as Record<Lang, Dict>;

/** Текст с переносами строк (\n) → массив строк для вывода через <br />. */
export const lines = (s: string) => s.split('\n');

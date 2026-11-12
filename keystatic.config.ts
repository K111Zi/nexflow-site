// Админка сайта (Keystatic): http://localhost:4321/keystatic при `npm run dev`.
// Сейчас сохраняет файлы на этом компьютере. После публикации переключим на GitHub —
// тогда редактировать можно будет прямо на сайте, а каждое сохранение станет коммитом.

import { config, fields, singleton } from '@keystatic/core';

const text = (label: string, opts: { multiline?: boolean; description?: string } = {}) =>
  fields.text({ label, ...opts });

const items = (label: string) =>
  fields.array(
    fields.object({
      title: text('Заголовок'),
      text: text('Текст', { multiline: true }),
    }),
    { label, itemLabel: (p) => p.fields.title.value || 'Пункт' },
  );

// Структура текстов одинакова для всех языков (совпадает с Dict в src/i18n/ui.ts).
const siteSchema = {
  meta: fields.object(
    {
      title: text('Заголовок во вкладке браузера и в Google'),
      description: text('Описание для Google и соцсетей', { multiline: true }),
    },
    { label: 'SEO' },
  ),
  hero: fields.object(
    {
      title: text('Главный заголовок'),
      subtitle: text('Подзаголовок', { multiline: true }),
    },
    { label: 'Первый экран' },
  ),
  cta: fields.object(
    {
      lead: text('Кнопка заявки'),
      call: text('Кнопка записи на звонок'),
    },
    { label: 'Кнопки' },
  ),
  nav: fields.object(
    {
      services: text('Услуги'),
      why: text('Почему мы'),
      demo: text('Примеры'),
      call: text('Звонок'),
      contact: text('Контакты'),
    },
    { label: 'Меню' },
  ),
  services: fields.object({ title: text('Заголовок раздела'), items: items('Услуги') }, { label: 'Услуги' }),
  why: fields.object({ title: text('Заголовок раздела'), items: items('Преимущества') }, { label: 'Почему мы' }),
  demo: fields.object(
    {
      title: text('Заголовок раздела'),
      note: text('Пояснение под заголовком', { multiline: true }),
      badge: text('Метка на карточке', { description: 'Например, «Демо»' }),
      items: items('Демо-примеры'),
    },
    { label: 'Демо-примеры' },
  ),
  call: fields.object(
    {
      title: text('Заголовок'),
      text: text('Текст', { multiline: true }),
      button: text('Кнопка'),
    },
    { label: 'Запись на звонок' },
  ),
  contact: fields.object(
    {
      title: text('Заголовок'),
      text: text('Текст', { multiline: true }),
      name: text('Поле «Имя»'),
      contact: text('Поле «Телефон или e-mail»'),
      task: text('Поле «Задача»'),
      submit: text('Кнопка отправки'),
      consent: text('Согласие под формой', { multiline: true }),
      messengers: text('Подпись к мессенджерам'),
      sending: text('Сообщение «Отправляем…»'),
      success: text('Сообщение об успешной отправке', { multiline: true }),
      error: text('Сообщение об ошибке', { multiline: true }),
    },
    { label: 'Форма заявки' },
  ),
  footer: fields.object(
    {
      privacy: text('Ссылка на политику'),
      cookies: text('Кнопка настроек cookie'),
      regCode: text('Подпись «Рег. код»'),
    },
    { label: 'Подвал' },
  ),
  cookie: fields.object(
    {
      text: text('Текст баннера', { multiline: true }),
      accept: text('Кнопка «Принять»'),
      decline: text('Кнопка «Отклонить»'),
      more: text('Ссылка «Подробнее»'),
    },
    { label: 'Баннер cookie' },
  ),
  legal: fields.object({ back: text('Кнопка «На главную»') }, { label: 'Страница политики' }),
  themes: fields.object(
    {
      label: text('Подпись меню тем'),
      light: text('Светлая'),
      dark: text('Тёмная'),
      emerald: text('Изумруд'),
      violet: text('Фиолетовая'),
    },
    { label: 'Названия цветовых тем' },
  ),
};

const site = (lang: string, label: string) =>
  singleton({
    label,
    path: `src/content/site/${lang}`,
    format: { data: 'json' },
    schema: siteSchema,
  });

export default config({
  storage: { kind: 'local' },
  ui: {
    brand: { name: 'NexFlow' },
    navigation: {
      'Тексты сайта': ['siteRu', 'siteEt', 'siteEn'],
      'Сайт': ['settings'],
    },
  },
  singletons: {
    siteRu: site('ru', 'Русский'),
    siteEt: site('et', 'Эстонский'),
    siteEn: site('en', 'Английский'),
    settings: singleton({
      label: 'Настройки',
      path: 'src/content/settings',
      format: { data: 'json' },
      schema: {
        contacts: fields.object(
          {
            whatsapp: text('WhatsApp — номер телефона', { description: 'С кодом страны, например +372 5555 5555' }),
            telegram: text('Telegram — имя пользователя', { description: 'Например, @nexflow' }),
            bookingUrl: text('Ссылка на запись на звонок', { description: 'Например, https://cal.com/nexflow/20min' }),
            email: text('E-mail для связи'),
          },
          { label: 'Контакты' },
        ),
        company: fields.object(
          {
            name: text('Название компании'),
            regCode: text('Регистрационный код'),
            address: text('Юридический адрес'),
          },
          { label: 'Реквизиты' },
        ),
        analytics: fields.object(
          { gaId: text('Google Analytics — ID', { description: 'Вида G-XXXXXXXXXX. Пусто — аналитика выключена' }) },
          { label: 'Аналитика' },
        ),
      },
    }),
  },
});

// Админка сайта NQO (Keystatic): <адрес сайта>/keystatic, вход через GitHub.
// Каждое сохранение — коммит в репозиторий K111Zi/nexflow-site, после чего Netlify обновляет сайт.
// Ключи GitHub App: KEYSTATIC_GITHUB_CLIENT_ID, KEYSTATIC_GITHUB_CLIENT_SECRET, KEYSTATIC_SECRET,
// PUBLIC_KEYSTATIC_GITHUB_APP_SLUG — в .env (локально) и в переменных окружения Netlify.
// Структура полей совпадает с типом Dict в src/i18n/ui.ts.

import { config, fields, singleton } from '@keystatic/core';

const text = (label: string, opts: { multiline?: boolean; description?: string } = {}) =>
  fields.text({ label, ...opts });

const NL = 'Перенос строки — Enter';

const items = (label: string) =>
  fields.array(
    fields.object({
      title: text('Заголовок'),
      text: text('Текст', { multiline: true }),
    }),
    { label, itemLabel: (p) => p.fields.title.value || 'Пункт' },
  );

const pageOptions = [
  { label: 'Главная', value: 'home' },
  { label: 'Услуги', value: 'solutions' },
  { label: 'Подход', value: 'process' },
  { label: 'Примеры', value: 'projects' },
  { label: 'О нас', value: 'about' },
  { label: 'Контакты', value: 'contact' },
  { label: 'Политика', value: 'privacy' },
] as const;
const pageSelect = (label: string) => fields.select({ label, options: pageOptions, defaultValue: 'home' });

const seo = {
  title: text('SEO: заголовок вкладки и Google'),
  description: text('SEO: описание для Google и соцсетей', { multiline: true }),
};

const intro = {
  ...seo,
  eyebrow: text('Надзаголовок'),
  heading: text('Заголовок страницы', { multiline: true, description: NL }),
  lead: text('Подзаголовок', { multiline: true }),
  aside: text('Короткая подпись справа'),
};

const siteSchema = {
  nav: fields.object(
    {
      home: text('Главная'),
      solutions: text('Услуги'),
      process: text('Подход'),
      projects: text('Примеры'),
      about: text('О нас'),
      contact: text('Контакты'),
      cta: text('Кнопка в шапке'),
    },
    { label: 'Меню' },
  ),
  ui: fields.object(
    {
      menuOpen: text('Открыть меню'),
      menuClose: text('Закрыть меню'),
      themeToLight: text('Включить светлую тему'),
      themeToDark: text('Включить тёмную тему'),
      language: text('Язык'),
      mainNav: text('Основная навигация'),
      footerNav: text('Навигация в подвале'),
    },
    { label: 'Служебные подписи (для экранных дикторов)' },
  ),
  home: fields.object(
    {
      ...seo,
      eyebrow: text('Надзаголовок'),
      heading: text('Главный заголовок', { multiline: true, description: NL }),
      lead: text('Подзаголовок', { multiline: true }),
      ctaPrimary: text('Главная кнопка'),
      ctaSecondary: text('Вторая ссылка'),
      bubble: text('Реплика робота', { multiline: true, description: NL }),
      robotAlt: text('Описание картинки робота'),
      services: items('Три услуги под первым экраном'),
      problemsEyebrow: text('Блок «Задачи»: надзаголовок'),
      problemsTitle: text('Блок «Задачи»: заголовок', { multiline: true, description: NL }),
      problemsLead: text('Блок «Задачи»: пояснение', { multiline: true }),
      problems: items('Задачи бизнеса'),
      approachEyebrow: text('Блок «Подход»: надзаголовок'),
      approachTitle: text('Блок «Подход»: заголовок', { multiline: true, description: NL }),
      approachLead: text('Блок «Подход»: пояснение', { multiline: true }),
      approach: fields.array(
        fields.object({
          label: text('Метка (например, «01 / Разбираемся»)'),
          title: text('Заголовок'),
          text: text('Текст', { multiline: true }),
        }),
        { label: 'Этапы подхода', itemLabel: (p) => p.fields.title.value || 'Этап' },
      ),
      approachCta: text('Блок «Подход»: кнопка'),
      demosEyebrow: text('Блок «Демо»: надзаголовок'),
      demosTitle: text('Блок «Демо»: заголовок', { multiline: true, description: NL }),
      demosLead: text('Блок «Демо»: пояснение', { multiline: true }),
    },
    { label: 'Главная' },
  ),
  solutions: fields.object(
    {
      ...intro,
      groupEyebrow: text('Подпись над направлением (например, «Решение»)'),
      groups: fields.array(
        fields.object({
          title: text('Направление'),
          text: text('Описание', { multiline: true }),
          items: items('Что входит'),
        }),
        { label: 'Направления', itemLabel: (p) => p.fields.title.value || 'Направление' },
      ),
      exampleLink: text('Ссылка «Посмотреть пример»'),
      noteTitle: text('Примечание: заголовок'),
      note: text('Примечание: текст', { multiline: true }),
    },
    { label: 'Страница «Услуги»' },
  ),
  process: fields.object(
    {
      ...intro,
      stepsEyebrow: text('Подпись над этапами'),
      steps: items('Этапы работы'),
      principlesEyebrow: text('Принципы: надзаголовок'),
      principlesTitle: text('Принципы: заголовок', { multiline: true, description: NL }),
      principles: items('Принципы'),
    },
    { label: 'Страница «Подход»' },
  ),
  projects: fields.object(
    {
      ...intro,
      tagline: text('Пояснение над карточками', { multiline: true }),
    },
    { label: 'Страница «Примеры»' },
  ),
  about: fields.object(
    {
      ...intro,
      word: text('Большое слово'),
      tagline: fields.array(text('Слово'), { label: 'Слова под большим словом', itemLabel: (p) => p.value || 'Слово' }),
      valuesEyebrow: text('Ценности: надзаголовок'),
      valuesTitle: text('Ценности: заголовок', { multiline: true, description: NL }),
      values: items('Ценности'),
      note: text('Примечание внизу', { multiline: true }),
    },
    { label: 'Страница «О нас»' },
  ),
  contact: fields.object(
    {
      ...seo,
      eyebrow: text('Надзаголовок'),
      heading: text('Заголовок', { multiline: true, description: NL }),
      lead: text('Подзаголовок', { multiline: true }),
      howTitle: text('«Как это работает»: заголовок'),
      howText: text('«Как это работает»: текст', { multiline: true }),
      channelsTitle: text('Подпись над мессенджерами'),
      bookCall: text('Кнопка записи на звонок'),
      formEyebrow: text('Форма: надзаголовок'),
      formTitle: text('Форма: заголовок'),
      name: text('Поле «Имя»'),
      namePlaceholder: text('Поле «Имя»: подсказка'),
      company: text('Поле «Компания»'),
      companyPlaceholder: text('Поле «Компания»: подсказка'),
      contact: text('Поле «Email или телефон»'),
      contactPlaceholder: text('Поле «Email или телефон»: подсказка'),
      interest: text('Поле «Что интересует»'),
      interestPlaceholder: text('Поле «Что интересует»: подсказка'),
      interestOptions: fields.array(text('Вариант'), { label: 'Варианты «Что интересует»', itemLabel: (p) => p.value || 'Вариант' }),
      task: text('Поле «Задача»'),
      taskPlaceholder: text('Поле «Задача»: подсказка'),
      consentBefore: text('Согласие: текст перед ссылкой', { multiline: true }),
      consentLink: text('Согласие: текст ссылки на политику'),
      submit: text('Кнопка отправки'),
      sending: text('Сообщение «Отправляем…»'),
      success: text('Сообщение об успехе', { multiline: true }),
      error: text('Сообщение об ошибке', { multiline: true }),
      invalid: text('Сообщение «заполните поля»', { multiline: true }),
    },
    { label: 'Страница «Контакты» и форма' },
  ),
  demos: fields.object(
    {
      tag: text('Метка на карточке'),
      open: text('Кнопка «Посмотреть сценарий»'),
      modalEyebrow: text('Окно: надзаголовок'),
      modalNote: text('Окно: пояснение'),
      step: text('Слово «Шаг»'),
      prev: text('Кнопка «Назад»'),
      next: text('Кнопка «Далее»'),
      restart: text('Кнопка «Начать заново»'),
      close: text('Кнопка «Закрыть»'),
      items: fields.array(
        fields.object({
          key: fields.select({
            label: 'Картинка на карточке',
            options: [
              { label: 'Список заявок', value: 'inbox' },
              { label: 'Чат', value: 'chat' },
              { label: 'Сайт ↔ CRM', value: 'integration' },
            ],
            defaultValue: 'inbox',
          }),
          title: text('Название сценария'),
          intro: text('Описание', { multiline: true }),
          steps: items('Шаги'),
        }),
        { label: 'Сценарии', itemLabel: (p) => p.fields.title.value || 'Сценарий' },
      ),
    },
    { label: 'Демо-сценарии' },
  ),
  cta: fields.object(
    {
      title: text('Заголовок', { multiline: true, description: NL }),
      text: text('Текст', { multiline: true }),
      button: text('Кнопка'),
    },
    { label: 'Призыв внизу страниц' },
  ),
  footer: fields.object(
    {
      eyebrow: text('Надзаголовок'),
      title: text('Заголовок', { multiline: true, description: NL }),
      button: text('Кнопка'),
      privacy: text('Ссылка на политику'),
      cookies: text('Кнопка настроек cookie'),
      regCode: text('Подпись «Рег. код»'),
      tagline: text('Подпись внизу'),
      motto: text('Девиз'),
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
  legal: fields.object({ eyebrow: text('Надзаголовок страницы политики') }, { label: 'Страница политики' }),
  helper: fields.object(
    {
      trigger: text('Кнопка в углу'),
      name: text('Имя помощника'),
      subtitle: text('Подпись под именем'),
      intro: text('Приветствие', { multiline: true }),
      shortcuts: fields.array(fields.object({ label: text('Текст кнопки'), page: pageSelect('Ведёт на страницу') }), {
        label: 'Быстрые кнопки',
        itemLabel: (p) => p.fields.label.value || 'Кнопка',
      }),
      inputLabel: text('Подпись над полем вопроса'),
      placeholder: text('Подсказка в поле'),
      send: text('Кнопка «Отправить» (для экранных дикторов)'),
      empty: text('Ответ на пустой вопрос', { multiline: true }),
      fallback: text('Ответ, если ничего не найдено', { multiline: true }),
      go: text('Ссылка «Перейти»'),
      close: text('Кнопка «Закрыть»'),
      disclaimer: text('Пояснение внизу', { multiline: true }),
      answers: fields.array(
        fields.object({
          keywords: text('Ключевые слова', { description: 'Через запятую; достаточно начала слова: «заяв» найдёт «заявка», «заявки»' }),
          text: text('Ответ', { multiline: true }),
          page: pageSelect('Ссылка на страницу'),
        }),
        { label: 'Ответы по ключевым словам', itemLabel: (p) => p.fields.keywords.value || 'Ответ' },
      ),
    },
    { label: 'Помощник «Нужна подсказка?»' },
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
  storage: { kind: 'github', repo: 'K111Zi/nexflow-site' },
  ui: {
    brand: { name: 'NQO' },
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
            telegram: text('Telegram — имя пользователя', { description: 'Например, @nqo' }),
            bookingUrl: text('Ссылка на запись на звонок', { description: 'Например, https://cal.com/nqo/20min' }),
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

// Все тексты сайта на трёх языках. Черновик — поправьте под себя.
// Эстонский текст стоит показать носителю языка перед запуском.

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
  };
  footer: { privacy: string };
  themes: { label: string; light: string; dark: string; emerald: string; violet: string };
}

export const themeIds = ['light', 'dark', 'emerald', 'violet'] as const;
export type ThemeId = (typeof themeIds)[number];

export const ui: Record<Lang, Dict> = {
  ru: {
    meta: {
      title: 'NexFlow — сайты, CRM и автоматизация для бизнеса в Эстонии',
      description:
        'Разработка сайтов, CRM и автоматизация бизнес-процессов для малого и среднего бизнеса в Эстонии. Всё в одном месте.',
    },
    nav: { services: 'Услуги', why: 'Почему мы', demo: 'Примеры', call: 'Звонок', contact: 'Контакты' },
    cta: { lead: 'Оставить заявку', call: 'Записаться на звонок' },
    hero: {
      title: 'Сайт, CRM и автоматизация — всё в одном месте',
      subtitle:
        'Помогаем малому и среднему бизнесу в Эстонии получать заявки и тратить меньше времени на рутину. Общаемся на русском, эстонском и английском.',
    },
    services: {
      title: 'Услуги',
      items: [
        { title: 'Разработка сайтов', text: 'Лендинги и сайты с формами заявок, онлайн-записью и другими функциями.' },
        { title: 'CRM и заявки', text: 'Учёт клиентов, контроль обращений и автоматизация продаж.' },
        {
          title: 'Автоматизация процессов',
          text: 'Коммерческие предложения, документы, отчёты, уведомления и рутинные задачи.',
        },
      ],
    },
    why: {
      title: 'Почему NexFlow',
      items: [
        { title: 'Одна команда', text: 'Сайт, CRM и автоматизация работают вместе, а не через трёх разных подрядчиков.' },
        { title: 'На вашем языке', text: 'Обсуждаем задачу на русском, эстонском или английском.' },
        { title: 'Без лишнего', text: 'Делаем то, что нужно бизнесу сейчас, и расширяем по мере роста.' },
      ],
    },
    demo: {
      title: 'Демо-примеры',
      note: 'Это демонстрационные проекты: они показывают, что мы можем сделать для вашего бизнеса.',
      badge: 'Демо',
      items: [
        { title: 'Сайт салона услуг', text: 'Лендинг с онлайн-записью и напоминаниями клиентам.' },
        { title: 'CRM для заявок', text: 'Все обращения с сайта и мессенджеров — в одной таблице со статусами.' },
        { title: 'Автоматические КП', text: 'Коммерческое предложение собирается и отправляется клиенту за минуту.' },
      ],
    },
    call: {
      title: 'Бесплатный звонок',
      text: 'Выберите удобное время — за 20 минут разберём вашу задачу.',
      button: 'Выбрать время',
    },
    contact: {
      title: 'Оставьте заявку',
      text: 'Напишите, что нужно, — мы ответим в течение рабочего дня.',
      name: 'Имя',
      contact: 'Телефон или e-mail',
      task: 'Задача',
      submit: 'Отправить заявку',
      consent: 'Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.',
      messengers: 'Или напишите в мессенджер:',
    },
    footer: { privacy: 'Политика конфиденциальности' },
    themes: { label: 'Тема', light: 'Светлая', dark: 'Тёмная', emerald: 'Изумруд', violet: 'Фиолетовая' },
  },

  et: {
    meta: {
      title: 'NexFlow — veebilehed, CRM ja automatiseerimine Eesti ettevõtetele',
      description:
        'Veebilehtede arendus, CRM ja äriprotsesside automatiseerimine väikestele ja keskmistele ettevõtetele Eestis. Kõik ühest kohast.',
    },
    nav: { services: 'Teenused', why: 'Miks meie', demo: 'Näited', call: 'Kõne', contact: 'Kontakt' },
    cta: { lead: 'Jäta päring', call: 'Broneeri kõne' },
    hero: {
      title: 'Veebileht, CRM ja automatiseerimine — kõik ühest kohast',
      subtitle:
        'Aitame väikestel ja keskmistel ettevõtetel Eestis saada päringuid ja kulutada vähem aega rutiinile. Suhtleme eesti, vene ja inglise keeles.',
    },
    services: {
      title: 'Teenused',
      items: [
        {
          title: 'Veebilehtede arendus',
          text: 'Maandumislehed ja veebilehed päringuvormide, online-broneerimise ja muude funktsioonidega.',
        },
        { title: 'CRM ja päringud', text: 'Klientide arvestus, pöördumiste kontroll ja müügi automatiseerimine.' },
        {
          title: 'Protsesside automatiseerimine',
          text: 'Hinnapakkumised, dokumendid, aruanded, teavitused ja rutiinsed ülesanded.',
        },
      ],
    },
    why: {
      title: 'Miks NexFlow',
      items: [
        { title: 'Üks meeskond', text: 'Veebileht, CRM ja automatiseerimine töötavad koos, mitte kolme eri partneri kaudu.' },
        { title: 'Sinu keeles', text: 'Arutame ülesannet eesti, vene või inglise keeles.' },
        { title: 'Ilma liigata', text: 'Teeme seda, mida ettevõte praegu vajab, ja laiendame kasvades.' },
      ],
    },
    demo: {
      title: 'Näidisprojektid',
      note: 'Need on näidisprojektid: need näitavad, mida saame sinu ettevõttele teha.',
      badge: 'Demo',
      items: [
        { title: 'Teenindussalongi veebileht', text: 'Maandumisleht online-broneerimise ja klientide meeldetuletustega.' },
        { title: 'CRM päringutele', text: 'Kõik päringud veebilehelt ja messengeritest ühes tabelis koos staatustega.' },
        { title: 'Automaatsed hinnapakkumised', text: 'Hinnapakkumine koostatakse ja saadetakse kliendile minutiga.' },
      ],
    },
    call: {
      title: 'Tasuta kõne',
      text: 'Vali sobiv aeg — 20 minutiga arutame sinu ülesande läbi.',
      button: 'Vali aeg',
    },
    contact: {
      title: 'Jäta päring',
      text: 'Kirjuta, mida vajad — vastame ühe tööpäeva jooksul.',
      name: 'Nimi',
      contact: 'Telefon või e-post',
      task: 'Ülesanne',
      submit: 'Saada päring',
      consent: 'Nupule vajutades nõustud isikuandmete töötlemisega.',
      messengers: 'Või kirjuta messengeris:',
    },
    footer: { privacy: 'Privaatsuspoliitika' },
    themes: { label: 'Teema', light: 'Hele', dark: 'Tume', emerald: 'Smaragd', violet: 'Violetne' },
  },

  en: {
    meta: {
      title: 'NexFlow — websites, CRM and automation for businesses in Estonia',
      description:
        'Website development, CRM and business process automation for small and medium businesses in Estonia. All in one place.',
    },
    nav: { services: 'Services', why: 'Why us', demo: 'Examples', call: 'Call', contact: 'Contact' },
    cta: { lead: 'Send a request', call: 'Book a call' },
    hero: {
      title: 'Website, CRM and automation — all in one place',
      subtitle:
        'We help small and medium businesses in Estonia get more leads and spend less time on routine. We speak English, Estonian and Russian.',
    },
    services: {
      title: 'Services',
      items: [
        { title: 'Website development', text: 'Landing pages and websites with request forms, online booking and more.' },
        { title: 'CRM and leads', text: 'Customer records, request tracking and sales automation.' },
        { title: 'Process automation', text: 'Quotes, documents, reports, notifications and routine tasks.' },
      ],
    },
    why: {
      title: 'Why NexFlow',
      items: [
        { title: 'One team', text: 'Your website, CRM and automation work together — not through three different vendors.' },
        { title: 'Your language', text: 'We discuss your task in English, Estonian or Russian.' },
        { title: 'Nothing extra', text: 'We build what your business needs now and grow it as you grow.' },
      ],
    },
    demo: {
      title: 'Demo projects',
      note: 'These are demo projects that show what we can build for your business.',
      badge: 'Demo',
      items: [
        { title: 'Salon website', text: 'A landing page with online booking and client reminders.' },
        { title: 'Lead CRM', text: 'Every request from the website and messengers in one table with statuses.' },
        { title: 'Automatic quotes', text: 'A quote is put together and sent to the client in a minute.' },
      ],
    },
    call: {
      title: 'Free call',
      text: 'Pick a time that suits you — in 20 minutes we will go through your task.',
      button: 'Pick a time',
    },
    contact: {
      title: 'Send a request',
      text: 'Tell us what you need — we reply within one business day.',
      name: 'Name',
      contact: 'Phone or e-mail',
      task: 'Task',
      submit: 'Send request',
      consent: 'By clicking the button, you agree to the processing of your personal data.',
      messengers: 'Or message us:',
    },
    footer: { privacy: 'Privacy policy' },
    themes: { label: 'Theme', light: 'Light', dark: 'Dark', emerald: 'Emerald', violet: 'Violet' },
  },
};

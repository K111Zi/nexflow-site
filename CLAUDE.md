# NQO — сайт компании

Общаемся на русском. Перед любым действием, требующим разрешения, — 2–3 предложения на русском: что именно, зачем и что изменится (см. глобальный CLAUDE.md).

## О проекте

- **NQO — Never Quit Optimizing** (раньше рабочее название NexFlow; переименовали 2026-11-12 — нашлась чужая «NexFlow — AI Automation Agency»). Новая компания в **Эстонии**, B2B: обработка заявок, AI-ассистенты, интеграции (CRM, сайты, мессенджеры), автоматизация процессов. Репозиторий и папка по-прежнему называются `nexflow-site`.
- Владелец и единственный, кто принимает решения, — пользователь (K1ZI).
- Документы (Claude Docs; написаны ещё под имя NexFlow):
  - Бриф сайта: https://claude.ai/artifact/GQotaTbEiy2r13EfFQSZhn
  - Бриф компании: https://claude.ai/artifact/PWULyXoeGBEKovwNLDWtNU
  - План проекта (9 этапов с чекбоксами): https://claude.ai/artifact/GUPD3Aet3hQkbgM4GkKh6K
- **Дизайн** — по макету владельца `NQO_site_v2.html` (лежал в `Downloads/Telegram Desktop`): светлый фон, чёрные блоки, крупная типографика, робот-шар NQO, нумерация «01 /». Блоки «Команда» и «Доверие» из макета сознательно не перенесены.

## Решения

- Сайт **многостраничный**: home, solutions, process, projects, about, contact, privacy × языки **et / ru / en** (`/ru/`, `/ru/solutions/` …); `/` → 301 на `/et/`.
- Цель: **1–2 заявки в месяц**. Аудитория: малый и средний бизнес в Эстонии. Общение на русском, эстонском, английском.
- **Цены не показываем.** Кейсов/отзывов нет — **демо-сценарии** с пометкой «Демо-сценарий · не клиентский кейс».
- Евро; GDPR. Аналитика — только Google Analytics, после согласия.
- Темы: **светлая (как в макете) + тёмная**, переключатель ☾/☀ в шапке, по умолчанию — настройка устройства.
- Открытый вопрос: «разработка сайтов» (была в брифе) в услугах макета отдельным направлением не значится.
- Порядок работы: сначала техника, потом тексты и визуал (решение владельца).

## Стек и структура

- **Astro 7**, Node.js 26 LTS (на Netlify — Node 24). Страницы статичные; адаптер **Netlify** нужен только админке.
- `astro.config.mjs`: i18n `prefixDefaultLocale: true`, редирект `/` → `/et/`, `site` — **https://creative-sunshine-6d5e20.netlify.app** (до покупки домена; `nexflow.netlify.app` — чужой сайт).
- `src/i18n/ui.ts` — языки, `pageKeys`, `pagePath(lang, page)`, `pageAlternates`, тип `Dict`, сборка `ui` из JSON.
- **Тексты** — `src/content/site/{et,ru,en}.json` (вся структура `Dict`: nav, home, solutions, process, projects, about, contact, demos, cta, footer, cookie, helper…). Переносы строк в заголовках — `\n` (компонент `Lines.astro`). ET и EN — черновики перевода.
- **Настройки** — `src/content/settings.json` (WhatsApp-номер, Telegram @имя, ссылка записи, e-mail, реквизиты, GA ID) → `src/config.ts` собирает ссылки (пусто → `#`; на «Контактах» такие кнопки не показываются).
- **Маршруты**: `src/pages/[lang]/index.astro` и `src/pages/[lang]/[page].astro` (getStaticPaths). Содержимое страниц — `src/components/pages/*.astro`.
- Общее: `layouts/Base.astro` (head, SEO, тема, подключает всё ниже), `Header.astro` (меню, язык, тема, ☰), `Footer.astro`, `PageIntro`, `Cta`, `DemoCard` + `DemoModal` (кнопки `data-demo="inbox|chat|integration"`), `Helper` (подсказчик по ключевым словам, без AI), `CookieBanner`, `Logo`.
- `public/images/robot.png` — робот из макета; `public/favicon.svg` — знак NQO.
- **Форма** — `contact` страница → `netlify/functions/lead.mjs` (`/api/lead`): name, company, contact, interest, task, consent (обязательно), ловушка `website`; отправка в **Telegram**. Секреты `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — `.env` (не в git) и Netlify. Сейчас **тестовый бот**, заявки в личный чат владельца (ID в `.env`).
- **Админка Keystatic** — `keystatic.config.ts` (схема повторяет `Dict`), `/keystatic`, `storage: github` (`K111Zi/nexflow-site`). GitHub App `k111zi-keystatic` создан; ключи `KEYSTATIC_*`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` — в `.env` и (нужно) в Netlify. После правок в админке — `git pull`.
- `src/i18n/privacy.ts` — текст политики (шаблон GDPR, в коде). `sitemap.xml.ts`, `robots.txt.ts` — все страницы.
- `src/styles/global.css` — все цвета через переменные; темы `:root[data-theme='light'|'dark']`.

## Команды

- `npx netlify-cli dev --offline` — **основной локальный запуск** (сайт + форма + админка) на http://localhost:8888, секреты из `.env`.
- `npm run dev` — только Astro (:4321), формы нет.
- `npm run build` — **не запускать при работающем `netlify dev`** (адаптер пишет `.netlify/v1`, локальный Netlify отдаёт старую сборку). Иначе: остановить dev, удалить `.netlify/v1`, запустить снова.
- Снимки страниц: Edge headless (`msedge --headless=new --screenshot`), `--blink-settings=preferredColorScheme=1` для светлой темы; ширина окна меньше ~500 px в headless не работает.

## Окружение

- Windows 11, PowerShell 5.1. **Smart App Control выключен** пользователем. В Windows включена тёмная тема.
- Git: репозиторий **https://github.com/K111Zi/nexflow-site** (private), ветка `main` → Netlify публикует автоматически. Вход GitHub сохранён в Git Credential Manager (первый вход — в отдельном окне PowerShell).
- Сайт: **https://creative-sunshine-6d5e20.netlify.app**
- Редиректы проверять через `curl.exe` (Invoke-WebRequest в PS 5.1 падает на 301).

## Что дальше

1. **Netlify:** импортировать переменные из `.env` (Telegram + Keystatic) и пересобрать — тест формы на сайте вернул `not_configured`; затем проверить заявку и вход в админку на сайте.
2. Заполнить настройки: WhatsApp, Telegram, Cal.com, e-mail, реквизиты (зарегистрирована ли компания — не уточнено), GA ID.
3. Настоящий бот NQO вместо тестового (токен тестового светился в чате).
4. Домен под NQO → `site` в `astro.config.mjs`; проверить свободность имени/знака NQO.
5. Политику — юристу; ET/EN тексты — носителям. Решить про «разработку сайтов» в услугах.
6. Обновить брифы в Claude Docs под NQO (по желанию владельца).

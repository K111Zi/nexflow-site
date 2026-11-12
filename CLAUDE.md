# NexFlow — сайт-лендинг

Общаемся на русском. Перед любым действием, требующим разрешения, — 2–3 предложения на русском: что именно, зачем и что изменится (см. глобальный CLAUDE.md).

## О проекте

- **NexFlow** — новая компания (первый проект) в **Эстонии**, B2B: разработка сайтов, CRM и автоматизация заявок, автоматизация бизнес-процессов.
- Владелец и единственный, кто принимает решения, — пользователь (K1ZI).
- Документы (Claude Docs):
  - Бриф сайта: https://claude.ai/artifact/GQotaTbEiy2r13EfFQSZhn
  - Бриф компании (суть, проблема, услуги, аудитория, преимущества, позиционирование): https://claude.ai/artifact/PWULyXoeGBEKovwNLDWtNU
  - План проекта (9 этапов с чекбоксами): https://claude.ai/artifact/GUPD3Aet3hQkbgM4GkKh6K

## Решения из брифа

- Тип: **лендинг** (одна страница), языки **эстонский (/et/), русский (/ru/), английский (/en/)**; `/` → 301 на `/et/`.
- Цель: **1–2 заявки в месяц** через сайт.
- Аудитория: малый и средний бизнес в Эстонии, которому нужна автоматизация.
- Главное отличие: **всё в одном месте** (сайт + CRM + автоматизация от одной команды) и общение на **русском и эстонском**.
- Функции: **форма заявки, мессенджеры (WhatsApp/Telegram), онлайн-запись на звонок**. Без онлайн-оплаты и личного кабинета.
- **Цены на сайте не показываем.** Кейсов/отзывов нет — вместо них **демо-примеры** с пометкой «Демо».
- Валюта — евро; закон — GDPR (не 152-ФЗ). Аналитика — только Google Analytics (без Яндекс Метрики).
- Конкуренты: adme.ee, veebiagency.com, webway.ee.
- Порядок работы: **сначала техническая часть, потом тексты и визуал** (решение владельца).

## Стек и структура

- **Astro 7**, Node.js 26 LTS, git. Страницы статичные; адаптер **Netlify** нужен только для админки. Хостинг — **Netlify** (`netlify.toml`, Node 24 на сборке).
- i18n Astro с `prefixDefaultLocale: true`; редирект `/` → `/et/` в `astro.config.mjs` (`redirects`). Там же `site` — **`https://creative-sunshine-6d5e20.netlify.app`** (адрес Netlify до покупки домена). `nexflow.netlify.app` — чужой сайт: есть другая компания «NexFlow — AI Automation Agency»; до покупки домена проверить `nexflow.ee` и товарный знак.
- **Тексты** — `src/content/site/{et,ru,en}.json` (редактируются в админке). `src/i18n/ui.ts` — языки, пути (`langPath`, `privacyPath`), тип `Dict` и сборка `ui` из JSON. Эстонский — черновик, нужна проверка носителем.
- **Настройки** — `src/content/settings.json`: WhatsApp (номер), Telegram (@имя), ссылка записи, e-mail, реквизиты компании, ID Google Analytics. `src/config.ts` читает его и собирает ссылки (пусто → `#`).
- **Админка Keystatic** — `keystatic.config.ts`, адрес `/keystatic`, `storage: github` (`K111Zi/nexflow-site`): вход через GitHub, сохранение = коммит в `main` → Netlify пересобирает сайт. После правок в админке делать `git pull`. Ключи GitHub App (`KEYSTATIC_*`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG`) — в `.env` и в Netlify.
- **Форма заявки** — `netlify/functions/lead.mjs` на `/api/lead`: проверка полей, ловушка для ботов (`website`), отправка в **Telegram**. Секреты `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID` — в `.env` (локально, не в git) и в переменных окружения Netlify. Образец — `.env.example`. Сейчас подключён **тестовый бот**, заявки идут в личный чат владельца (ID — в `.env`).
- `src/components/Landing.astro` — главная страница + скрипты тем, меню, отправки формы и событий аналитики (`generate_lead`, `contact_click`, `book_call_click`).
- `src/components/Privacy.astro` + `src/i18n/privacy.ts` — политика конфиденциальности (шаблон GDPR, 3 языка, текст в коде). Пустые реквизиты показываются как `[reg. code]` и т. п.
- `src/components/CookieBanner.astro` — баннер согласия; Google Analytics грузится только после «Принять». Без GA ID баннера нет.
- `src/components/Footer.astro` — общий подвал; `src/layouts/Base.astro` — `<head>`: canonical, hreflang (+x-default → /et/), Open Graph, скрипт темы.
- `src/pages/{et,ru,en}/index.astro` и `.../privacy.astro`; `src/pages/sitemap.xml.ts`, `robots.txt.ts`.
- `src/styles/global.css` — стили; **4 цветовые темы** через CSS-переменные и `data-theme` на `<html>`: light, dark, emerald, violet. Выбор в localStorage (`theme`).

## Команды

- `npx netlify-cli dev --offline` — **основной локальный запуск**: сайт, форма и админка на http://localhost:8888 (берёт секреты из `.env`).
- `npm run dev` — только Astro на http://localhost:4321; **форма там не работает** (нет `/api/lead`).
- `npm run build` — сборка в `dist/`. **Не запускать при работающем `netlify dev`**: адаптер пишет `.netlify/v1`, и локальный Netlify начинает отдавать старую сборку. Если случилось — остановить dev, удалить `.netlify/v1`, запустить снова.

## Окружение

- Windows 11, PowerShell 5.1. **Smart App Control выключен** пользователем (блокировал нативный модуль Astro).
- Git: имя/e-mail прописаны только локально. Репозиторий **https://github.com/K111Zi/nexflow-site** (private), `origin`, ветка `main` публикуется на Netlify автоматически. Вход GitHub сохранён в Git Credential Manager (первый вход делали в отдельном окне PowerShell — из сессии Claude окно входа не открывается).
- Сайт: **https://creative-sunshine-6d5e20.netlify.app**
- Проверять редиректы через `curl.exe` (Invoke-WebRequest в PS 5.1 падает на 301).

## Что дальше

1. **Публикация:** сделано (GitHub + Netlify). Проверить переменные Telegram в Netlify (тест с сайта вернул `not_configured`), настроить GitHub App для Keystatic.
2. Заполнить в админке **настройки**: WhatsApp, Telegram, Cal.com, e-mail, реквизиты OÜ (зарегистрирована ли компания — не уточнено), GA ID.
3. Завести **настоящего бота NexFlow** вместо тестового (токен тестового светился в чате).
4. Домен (напр. `nexflow.ee`) → обновить `site` в `astro.config.mjs`.
5. Политику конфиденциальности проверить с юристом; эстонские тексты — с носителем.
6. Потом: **тексты и визуал** (слоган, сегменты, «О нас», демо-примеры, дизайн) — см. бриф компании и план.

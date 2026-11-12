// Все внешние ссылки сайта в одном месте. Заполните, когда появятся аккаунты.

// Куда отправляется форма заявки: функция Netlify (netlify/functions/lead.mjs), пересылает в Telegram.
// Работает только на Netlify или локально через `netlify dev`; при `npm run dev` форма покажет ошибку.
export const FORM_ENDPOINT = '/api/lead';

// Ссылка на запись в календаре (например, https://cal.com/nexflow/20min).
export const BOOKING_URL = '#';

// Мессенджеры.
export const WHATSAPP_URL = '#'; // https://wa.me/372XXXXXXXX
export const TELEGRAM_URL = '#'; // https://t.me/username

export const CONTACT_EMAIL = ''; // info@...

// Google Analytics 4: ID вида G-XXXXXXXXXX.
// Пока пусто — аналитика не подключается и баннер cookie не показывается.
export const GA_MEASUREMENT_ID = '';

// Реквизиты компании — для подвала и политики конфиденциальности.
// Пустые поля показываются на сайте как [заглушка] — заполните до запуска.
export const COMPANY = {
  name: 'NexFlow OÜ',
  regCode: '', // регистрационный код из Äriregister
  address: '', // юридический адрес
};

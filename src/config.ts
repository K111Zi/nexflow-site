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

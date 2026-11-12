// Внешние ссылки и реквизиты сайта.
// Значения редактируются в админке (/keystatic → «Настройки») и хранятся в src/content/settings.json.
import settings from './content/settings.json';

// Пустое поле админка может сохранить как "" или не сохранить вовсе — приводим к строке.
const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
const contacts = {
  whatsapp: str(settings.contacts?.whatsapp),
  telegram: str(settings.contacts?.telegram),
  bookingUrl: str(settings.contacts?.bookingUrl),
  email: str(settings.contacts?.email),
};
const company = {
  name: str(settings.company?.name),
  regCode: str(settings.company?.regCode),
  address: str(settings.company?.address),
};
const analytics = { gaId: str(settings.analytics?.gaId) };

// Куда отправляется форма заявки: функция Netlify (netlify/functions/lead.mjs), пересылает в Telegram.
// Работает только на Netlify или локально через `netlify dev`; при `npm run dev` форма покажет ошибку.
export const FORM_ENDPOINT = '/api/lead';

// Ссылка на запись в календаре (например, https://cal.com/nqo/20min).
export const BOOKING_URL = contacts.bookingUrl || '#';

// Мессенджеры: из номера телефона и имени пользователя собираем ссылки.
const phoneDigits = contacts.whatsapp.replace(/\D/g, '');
export const WHATSAPP_URL = phoneDigits ? `https://wa.me/${phoneDigits}` : '#';

const telegramUser = contacts.telegram.trim().replace(/^@/, '').replace(/^https?:\/\/t\.me\//, '');
export const TELEGRAM_URL = telegramUser ? `https://t.me/${telegramUser}` : '#';

export const CONTACT_EMAIL = contacts.email.trim();

// Google Analytics 4: ID вида G-XXXXXXXXXX. Пусто — аналитика и баннер cookie выключены.
export const GA_MEASUREMENT_ID = analytics.gaId.trim();

// Реквизиты компании. Пустые поля показываются в политике как [заглушка].
export const COMPANY = {
  name: company.name.trim(),
  regCode: company.regCode.trim(),
  address: company.address.trim(),
};

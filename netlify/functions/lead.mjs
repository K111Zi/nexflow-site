// Приём заявки с сайта и отправка её в Telegram.
// Работает на Netlify по адресу /api/lead.
// Нужны переменные окружения (задаются в настройках сайта на Netlify):
//   TELEGRAM_BOT_TOKEN — токен бота от @BotFather
//   TELEGRAM_CHAT_ID   — куда бот пишет заявки (ваш чат или группа)

const LIMITS = { name: 100, contact: 150, task: 2000 };
const LANG_PATHS = { et: '/et/', ru: '/ru/', en: '/en/' };

const escapeHtml = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' })[c]);

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
  }

  // Скрипт на странице просит JSON; без JavaScript браузер отправляет обычную форму —
  // тогда возвращаем посетителя на сайт с отметкой об успехе или ошибке.
  const wantsJson = (req.headers.get('accept') || '').includes('application/json');
  let lang = 'et';

  const reply = (status, error) => {
    if (wantsJson) return Response.json({ ok: !error, error }, { status });
    const url = new URL(LANG_PATHS[lang], req.url);
    url.searchParams.set('lead', error ? 'error' : 'sent');
    url.hash = 'contact';
    return Response.redirect(url, 303);
  };

  let form;
  try {
    form = await req.formData();
  } catch {
    return reply(400, 'bad_request');
  }

  const field = (key) => String(form.get(key) ?? '').trim();
  if (field('lang') in LANG_PATHS) lang = field('lang');

  // Ловушка для спам-ботов: это поле скрыто от людей, боты его заполняют.
  if (field('website')) return reply(200);

  const name = field('name');
  const contact = field('contact');
  const task = field('task');

  if (!name || !contact) return reply(400, 'required');
  if (name.length > LIMITS.name || contact.length > LIMITS.contact || task.length > LIMITS.task) {
    return reply(400, 'too_long');
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.error('lead: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не заданы');
    return reply(500, 'not_configured');
  }

  const text = [
    `<b>Новая заявка с сайта</b> (${lang.toUpperCase()})`,
    `<b>Имя:</b> ${escapeHtml(name)}`,
    `<b>Контакт:</b> ${escapeHtml(contact)}`,
    task && `<b>Задача:</b>\n${escapeHtml(task)}`,
  ]
    .filter(Boolean)
    .join('\n');

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: 'HTML', disable_web_page_preview: true }),
    });
    if (!res.ok) {
      console.error('lead: Telegram ответил ошибкой', res.status, await res.text());
      return reply(502, 'send_failed');
    }
  } catch (err) {
    console.error('lead: не удалось связаться с Telegram', err);
    return reply(502, 'send_failed');
  }

  return reply(200);
};

export const config = { path: '/api/lead' };

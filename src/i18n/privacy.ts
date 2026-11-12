// Политика конфиденциальности (GDPR) на трёх языках.
// Это шаблон, а не юридическая консультация: перед запуском проверьте текст с юристом.
// {company}, {regCode}, {address}, {email} подставляются из src/config.ts.

import type { Lang } from './ui';

export interface PrivacySection {
  title: string;
  paragraphs: string[];
}

export interface PrivacyDict {
  title: string;
  description: string;
  updated: string;
  sections: PrivacySection[];
}

export const PRIVACY_UPDATED = '2026-11-12';

export const privacy: Record<Lang, PrivacyDict> = {
  ru: {
    title: 'Политика конфиденциальности',
    description: 'Как NQO обрабатывает персональные данные посетителей сайта и клиентов.',
    updated: 'Обновлено',
    sections: [
      {
        title: '1. Кто обрабатывает данные',
        paragraphs: [
          'Ответственный за обработку данных — {company}, регистрационный код {regCode}, адрес: {address}. По всем вопросам о данных пишите на {email}.',
        ],
      },
      {
        title: '2. Какие данные мы получаем',
        paragraphs: [
          'Из формы заявки: имя, телефон или e-mail, описание задачи и язык страницы, с которой отправлена заявка.',
          'Если вы пишете нам в WhatsApp или Telegram или записываетесь на звонок — те данные, которые вы сами передаёте через эти сервисы.',
          'Только с вашего согласия — данные аналитики Google Analytics: какие страницы вы смотрели, тип устройства и браузера, примерное местоположение и обезличенный идентификатор.',
        ],
      },
      {
        title: '3. Зачем и на каком основании',
        paragraphs: [
          'Чтобы ответить на заявку, обсудить задачу и подготовить предложение — это шаги до заключения договора по вашей просьбе (ст. 6(1)(b) GDPR).',
          'Чтобы защищать сайт от спама и злоупотреблений — наш законный интерес (ст. 6(1)(f) GDPR).',
          'Чтобы понимать, как пользуются сайтом, и улучшать его — только с вашего согласия (ст. 6(1)(a) GDPR).',
        ],
      },
      {
        title: '4. Кому мы передаём данные',
        paragraphs: [
          'Мы не продаём и не передаём данные для рекламы. Данные обрабатывают только сервисы, без которых сайт не работает: Netlify (хостинг и приём формы), Telegram (уведомление о новой заявке приходит нам в мессенджер), Cal.com (если вы записываетесь на звонок) и Google (аналитика — только с согласия).',
          'Некоторые из этих сервисов могут обрабатывать данные за пределами ЕС, например в США. В таком случае передача основана на стандартных договорных условиях ЕС или на EU-US Data Privacy Framework.',
        ],
      },
      {
        title: '5. Сколько мы храним данные',
        paragraphs: [
          'Заявки, после которых договор не заключён, — до 12 месяцев, затем удаляем. Если мы начали сотрудничество — столько, сколько требует закон Эстонии для договорной и бухгалтерской документации.',
          'Данные аналитики — до 14 месяцев.',
        ],
      },
      {
        title: '6. Cookie и память браузера',
        paragraphs: [
          'Сайт запоминает выбранную цветовую тему и ваш выбор по cookie в памяти браузера (localStorage). Это нужно для работы сайта и не требует согласия.',
          'Cookie Google Analytics (_ga и подобные) устанавливаются, только если вы нажали «Принять». Изменить решение можно в любой момент кнопкой «Настройки cookie» внизу страницы.',
        ],
      },
      {
        title: '7. Ваши права',
        paragraphs: [
          'Вы можете узнать, какие данные о вас у нас есть, исправить или удалить их, ограничить обработку, возразить против неё, получить данные в удобном формате и в любой момент отозвать согласие. Для этого напишите на {email}.',
          'Если вы считаете, что мы нарушаем ваши права, вы можете подать жалобу в Инспекцию по защите данных Эстонии (Andmekaitse Inspektsioon, www.aki.ee).',
        ],
      },
      {
        title: '8. Изменения',
        paragraphs: ['Мы можем обновлять эту политику. Актуальная версия всегда на этой странице, дата обновления указана вверху.'],
      },
    ],
  },

  et: {
    title: 'Privaatsuspoliitika',
    description: 'Kuidas NQO töötleb veebilehe külastajate ja klientide isikuandmeid.',
    updated: 'Uuendatud',
    sections: [
      {
        title: '1. Kes andmeid töötleb',
        paragraphs: [
          'Vastutav töötleja on {company}, registrikood {regCode}, aadress: {address}. Andmetega seotud küsimustes kirjuta {email}.',
        ],
      },
      {
        title: '2. Milliseid andmeid saame',
        paragraphs: [
          'Päringuvormist: nimi, telefon või e-post, ülesande kirjeldus ja lehe keel, millelt päring saadeti.',
          'Kui kirjutad meile WhatsAppis või Telegramis või broneerid kõne — andmed, mida ise nende teenuste kaudu edastad.',
          'Ainult sinu nõusolekul — Google Analyticsi andmed: vaadatud lehed, seadme ja brauseri tüüp, ligikaudne asukoht ja anonüümne identifikaator.',
        ],
      },
      {
        title: '3. Milleks ja mis alusel',
        paragraphs: [
          'Päringule vastamiseks, ülesande arutamiseks ja pakkumise koostamiseks — lepingueelsed toimingud sinu soovil (IKÜM art 6 lg 1 p b).',
          'Veebilehe kaitsmiseks rämpsposti ja kuritarvituste eest — meie õigustatud huvi (IKÜM art 6 lg 1 p f).',
          'Et mõista, kuidas veebilehte kasutatakse, ja seda parandada — ainult sinu nõusolekul (IKÜM art 6 lg 1 p a).',
        ],
      },
      {
        title: '4. Kellele andmeid edastame',
        paragraphs: [
          'Me ei müü andmeid ega edasta neid reklaami jaoks. Andmeid töötlevad ainult teenused, ilma milleta veebileht ei tööta: Netlify (majutus ja vormi vastuvõtt), Telegram (teavitus uuest päringust jõuab meile messengerisse), Cal.com (kui broneerid kõne) ja Google (analüütika — ainult nõusolekul).',
          'Mõned neist teenustest võivad töödelda andmeid väljaspool ELi, näiteks USAs. Sel juhul põhineb edastamine ELi tüüptingimustel või EU-US Data Privacy Frameworkil.',
        ],
      },
      {
        title: '5. Kui kaua andmeid säilitame',
        paragraphs: [
          'Päringuid, millele lepingut ei järgnenud, säilitame kuni 12 kuud, seejärel kustutame. Koostöö korral — nii kaua, kui Eesti seadused nõuavad lepingu- ja raamatupidamisdokumentide puhul.',
          'Analüütika andmeid — kuni 14 kuud.',
        ],
      },
      {
        title: '6. Küpsised ja brauseri mälu',
        paragraphs: [
          'Veebileht jätab valitud värviteema ja sinu küpsiste valiku meelde brauseri mällu (localStorage). See on vajalik veebilehe toimimiseks ega nõua nõusolekut.',
          'Google Analyticsi küpsised (_ga jms) seatakse ainult siis, kui vajutasid „Nõustun“. Otsust saad igal ajal muuta lehe allosas oleva nupuga „Küpsiste seaded“.',
        ],
      },
      {
        title: '7. Sinu õigused',
        paragraphs: [
          'Sul on õigus teada, milliseid andmeid sinu kohta hoiame, neid parandada või kustutada, töötlemist piirata, sellele vastu vaielda, saada andmed mugavas vormingus ja igal ajal nõusolek tagasi võtta. Selleks kirjuta {email}.',
          'Kui leiad, et rikume sinu õigusi, võid esitada kaebuse Andmekaitse Inspektsioonile (www.aki.ee).',
        ],
      },
      {
        title: '8. Muudatused',
        paragraphs: ['Võime seda poliitikat uuendada. Kehtiv versioon on alati sellel lehel, uuendamise kuupäev on märgitud üleval.'],
      },
    ],
  },

  en: {
    title: 'Privacy policy',
    description: 'How NQO processes the personal data of website visitors and clients.',
    updated: 'Updated',
    sections: [
      {
        title: '1. Who processes the data',
        paragraphs: [
          'The data controller is {company}, registry code {regCode}, address: {address}. For any questions about your data, write to {email}.',
        ],
      },
      {
        title: '2. What data we receive',
        paragraphs: [
          'From the request form: your name, phone or e-mail, a description of your task and the language of the page you sent it from.',
          'If you message us on WhatsApp or Telegram or book a call — the data you share through those services yourself.',
          'Only with your consent — Google Analytics data: pages viewed, device and browser type, approximate location and a pseudonymous identifier.',
        ],
      },
      {
        title: '3. Why and on what legal basis',
        paragraphs: [
          'To reply to your request, discuss your task and prepare an offer — steps taken at your request before entering into a contract (Art. 6(1)(b) GDPR).',
          'To protect the site from spam and abuse — our legitimate interest (Art. 6(1)(f) GDPR).',
          'To understand how the site is used and improve it — only with your consent (Art. 6(1)(a) GDPR).',
        ],
      },
      {
        title: '4. Who we share data with',
        paragraphs: [
          'We do not sell data or share it for advertising. Data is processed only by services the site needs to work: Netlify (hosting and form handling), Telegram (new request notifications reach us in the messenger), Cal.com (if you book a call) and Google (analytics — only with consent).',
          'Some of these services may process data outside the EU, for example in the USA. In that case the transfer relies on the EU Standard Contractual Clauses or the EU-US Data Privacy Framework.',
        ],
      },
      {
        title: '5. How long we keep data',
        paragraphs: [
          'Requests that did not lead to a contract — up to 12 months, then deleted. If we start working together — as long as Estonian law requires for contract and accounting records.',
          'Analytics data — up to 14 months.',
        ],
      },
      {
        title: '6. Cookies and browser storage',
        paragraphs: [
          'The site remembers your colour theme and your cookie choice in browser storage (localStorage). This is needed for the site to work and does not require consent.',
          'Google Analytics cookies (_ga and similar) are set only if you clicked “Accept”. You can change your decision at any time with the “Cookie settings” button at the bottom of the page.',
        ],
      },
      {
        title: '7. Your rights',
        paragraphs: [
          'You can find out what data we hold about you, have it corrected or deleted, restrict or object to its processing, receive it in a portable format and withdraw your consent at any time. To do so, write to {email}.',
          'If you believe we are violating your rights, you can file a complaint with the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, www.aki.ee).',
        ],
      },
      {
        title: '8. Changes',
        paragraphs: ['We may update this policy. The current version is always on this page; the update date is shown at the top.'],
      },
    ],
  },
};

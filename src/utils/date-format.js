/**
 * Форматирует дату в строку вида "DD month YYYY в HH:MM"
 * @returns string
 */

export function formatDate(str, locale = 'ru-RU') {
  const newDate = new Date(str);
  const optionsDate = { day: '2-digit', month: 'long', year: 'numeric' }
  const optionsTime = { hour: "numeric", minute: "numeric" }
  const date = new Intl.DateTimeFormat(locale, optionsDate).format(newDate).slice(0, -3);
  const time = new Intl.DateTimeFormat(locale, optionsTime).format(newDate);
  return `${date} в ${time}`;
};

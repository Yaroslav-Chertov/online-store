/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
};

export function getHierarchy(list) {

  const map = {};

  list.forEach(item => {
    map[item._id] = { value: item._id, title: item.title, depth: 0 };
  });

  const result = [];

  function addItemToResult(item, depth) {
    const indent = '- '.repeat(depth);
    result.push({ value: item.value, title: `${indent}${item.title}` });

    const children = list.filter(child => child.parent && child.parent._id === item.value);
    children.forEach(child => addItemToResult(map[child._id], depth + 1));
  };

  const rootItems = list.filter(item => !item.parent);
  rootItems.forEach(item => addItemToResult(map[item._id], 0));

  return result;
}

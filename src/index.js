import React from 'react';
import { createRoot } from 'react-dom/client';
import { createElement, generateNumbers } from './utils.js';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    { code: generateNumbers(), title: 'Название элемента' },
    { code: generateNumbers(), title: 'Некий объект' },
    { code: generateNumbers(), title: 'Заголовок' },
    { code: generateNumbers(), title: 'Очень длинное название элемента из семи слов' },
    { code: generateNumbers(), title: 'Запись' },
    { code: generateNumbers(), title: 'Шестая запись' },
    { code: generateNumbers(), title: 'Седьмая запись' },
  ],
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store} />);
});

// Первый рендер приложения
root.render(<App store={store} />);

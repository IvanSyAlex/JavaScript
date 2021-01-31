/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

function rowTable(name = '', value = '') {
  //создаём строку для таблицы и заполняем её
  const row = document.createElement('TR');
  const tdName = document.createElement('TD');
  const tdVAlue = document.createElement('TD');
  const tdButton = document.createElement('TD');
  const button = document.createElement('BUTTON');
  tdName.innerHTML = name;
  tdVAlue.innerHTML = value;
  button.innerHTML = 'удалить';
  button.dataset.role = 'delete-cookie';
  button.dataset.name = name;

  tdButton.appendChild(button);
  row.appendChild(tdName);
  row.appendChild(tdVAlue);
  row.appendChild(tdButton);
  listTable.appendChild(row);
}

function createObjectCookie() {
  //создаём  объект
  const arrCookie = document.cookie.split(';');
  return arrCookie.reduce((obj, current) => {
    const [name, value] = current.split('=');
    if (name !== '') {
      obj[name] = value;
      return obj;
    }
  }, {});
}

function add(valueFilter = '') {
  const obj = createObjectCookie();
  if (obj && valueFilter === '') {
    for (const [name, value] of Object.entries(obj)) {
      rowTable(name, value);
    }
  } else if (obj && valueFilter !== '') {
    for (const [name, value] of Object.entries(obj)) {
      if (value.indexOf(valueFilter) >= 0 || name.indexOf(valueFilter) >= 0) {
        rowTable(name, value);
      } else {
        continue;
      }
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  add();
});

filterNameInput.addEventListener('input', function () {
  listTable.innerHTML = '';
  add(filterNameInput.value.toLowerCase());
});

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  listTable.innerHTML = '';
  add(filterNameInput.value.toLowerCase());
});

listTable.addEventListener('click', (e) => {
  if (e.target.dataset.role === 'delete-cookie') {
    document.cookie = `${e.target.dataset.name}=delete; max-age=0`;
    listTable.innerHTML = '';
    add(filterNameInput.value.toLowerCase());
  }
});

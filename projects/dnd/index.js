/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

let cursorPrevX = 0;
let cursorPrevY = 0;
let curentDomElement = null;

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {
  if (curentDomElement) {
    const moveX = e.pageX - cursorPrevX; // +right; -left
    const moveY = e.pageY - cursorPrevY; // +top; -down
    cursorPrevX = e.pageX;
    cursorPrevY = e.pageY;
    changePositionForElement(curentDomElement, moveX, moveY);
  }
});

document.addEventListener('mousedown', (e) => {
  if (e.target && e.target.tagName === 'DIV') {
    curentDomElement = e.target;
    cursorPrevX = e.pageX;
    cursorPrevY = e.pageY;
  }
});

document.addEventListener('mouseup', (e) => {
  if (curentDomElement) {
    curentDomElement = null;
  }
});

function changePositionForElement(element, moveX, moveY) {
  if (element) {
    const x = parseInt(element.style.left.replace('px', ''));
    const y = parseInt(element.style.top.replace('px', ''));
    element.style.left = x + moveX + 'px';
    element.style.top = y + moveY + 'px';
  }
}

export function createDiv() {
  function random() {
    const num = (Math.random() * 1000) / 4; // условие, чтоб не привышало 250 , для задания цвета rgb(0,0,0)
    const result = num - (num % 2);
    return result;
  }
  function randomColor() {
    const color = 'rgb(' + random() + ',' + random() + ',' + random() + ')';
    return color;
  }

  const newDiv = document.createElement('div');
  newDiv.innerHTML = 'Hello';
  newDiv.classList.add('.draggable-div');

  homeworkContainer.appendChild(newDiv);
  newDiv.style.height = random() + 'px';
  newDiv.style.width = random() + 'px';
  newDiv.style.background = randomColor();
  newDiv.style.position = 'absolute';
  newDiv.style.top = random() + 'px';
  newDiv.style.left = random() + 'px';
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  createDiv();
});

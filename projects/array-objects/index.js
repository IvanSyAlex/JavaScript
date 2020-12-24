/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function callback(val, index, array) {
  console.log('индекс - ' + index + ', элемент - ' + array[index]);
}
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
}
forEach([1, 2, 3], callback);

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */

function callBackMap(val, index, array) {
  array[index] * index;
}

function map(array, fn) {
  const nemArray = new Array(array.length);
  for (let i = 0; i < array.length; i++) {
    nemArray[i] = fn(array[i], i, array);
  }
  return nemArray;
}
const nArray = map([1, 2, 3], callBackMap);
console.log(nArray);

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */

function callBackReduce(previousValue, currentValue, index, array) {
  return previousValue + currentValue;
}
function reduce(array, fn, initial) {
  let summ;

  if (typeof initial === 'number' && !isNaN(initial)) {
    summ = initial;
    for (let i = 0; i < array.length; i++) {
      summ = fn(summ, array[i], i, array);
    }
  } else {
    summ = array[0];
    for (let i = 1; i < array.length; i++) {
      summ = fn(summ, array[i], i, array);
    }
  }
  return summ;
}

const rez = reduce([1, 2, 3], callBackReduce);
console.log(rez);

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

const testConvert = {
  page1: 'Первая страница',
  page2: 'Вторая страница',
  page3: 'Третья страница',
};

function upperProps(obj) {
  const nameKeys = [];
  for (const item in obj) {
    nameKeys.push(item.toUpperCase());
  }
  return nameKeys;
}
const newArray = upperProps(testConvert);
console.log(newArray);

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  console.log('test');
}

export { forEach, map, reduce, upperProps, createProxy };

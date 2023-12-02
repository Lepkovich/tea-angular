Склонировано с master (КР22)

## Домашка к уроку «Контрольное задание 23»
В этой контрольной работе вам предстоит доработать проект с чаем, который вы делали в предыдущей контрольной.

### Часть 1
Уберите подключение библиотеки bootstrap через файлы и подключите в проект ng-bootstrap через Angular cli. Сделайте так, чтобы в вашем проекте всё продолжило работать с учетом ng-bootstrap.

### Часть 2
Разделите ваш проект на модули аналогично тому, как было в уроке:

1. Shared модуль
   Должен содержать основные общие компоненты: шапка, подвал. По желанию можно вынести сюда компонент карточки товара. Если в вашем проекте есть папйы и директивы - то также вынесите их в этот модуль.

2. Feature модули
   Создать отдельную папку для частей приложения. Внутри нее реализовать отдельные модули:
- products для товаров
- order для страницы с формой заказа
- main для простых страниц типа главной

### Часть 3
Сделайте Production сборку вашего проекта и загрузите его на GitHub Pages.

### Дополнительно
1. Сделать так, чтобы во время отправки запроса с формы кнопка становилась недоступной (disabled). Когда ответ получен - кнопка снова доступна.
2. Если запрос на отправку заказа не был успешным (в ответ пришло success со значением 0) - ошибка должна показываться на 3 секунда, а потом исчезать.
3. Добавить лоадер для страницы каталога
4. Реализовать поиск по товарам.
   Состояние поиска должно храниться в subject.
   Как должен работать:
   Пользователь вводит поисковый запрос в поле и нажимает «Найти». Его перекидывает на страницу каталога, при этом:
1. Заголовок на странице с товарами подменяется по следующему принципу: если в subject пусто, то выводим «Наши чайные коллекции», иначе «Результаты поиска по запросу (слово в поле)»
2. Отображаются только те товары, которые соответствуют запросу. Для этого нужно сделать get запрос на адрес https://testologia.site/tea c query параметром search. Если товаров не нашлось - отображается текст «Ничего не найдено»
   Также в поле поиска должен отображаться текущий поисковый запрос, и должна иметься кнопка сброса, при клике на которую значение subject очищается, а на странице товаров отображаются все товары (то есть get запрос происходит без query параметра).
   Обратите внимание, для страницы поиска используется тот же компонент, что и для отображения страницы каталога, запрос идет на тот же url, только с guery-параметром search.

# SPA по фильмам на React.js

## Запуск
* склонировать репозиторий
* выполнить в терминале `npm i` для установки зависимостей
* запустить приложение с помощью команды `npm run dev` в терминале

## Структура проекта
* `assets` — статические ресурсы
* `components` — компоненты приложения
* `hooks` — кастомные хуки
* `layouts` — шаблоны страниц
* `pages` — компоненты страниц приложения
* `router` — данные о маршрутах и соответствующих им страницах
* `store` — хранилище глобального состояния приложения  
* `utils` — дополнительные константы и функции

## Функционал
### Главная страница
* получение списка фильмов в виде карточек с информацией (название, описание, тип, год выхода, жанры, актёры, рейтинг)
* сортировка по убыванию/возрастанию рейтинга
* фильтрация по типу ('все', 'фильм', 'сериал', 'мультфильм')
* добавление (и удаление) фильма в список 'Избранное' и 'Посмотреть позже' по клику на соответствующую иконку на карточке
* переход на страницу детальной информации по клику на имя фильма
* переход на страницу поиска с заполненной формой и отображением отфильтрованных фильмов по клику на жанр

### Страница поиска
* выбор условий поиска с помощью формы: ввод части названия, описания (без учёта регистра), множественный выбор жанров
* получение списка фильмов, удовлетворяющих всем заданным условиям поиска, в виде карточек с информацией
* весь функционал, описанный для Главной страницы, сохраняется

### Страница детальной информации о фильме
* получение информации о выбранном фильме (название, описание, тип, год выхода, жанры, актёры, рейтинг)
* получение списка похожих фильмов (на основе совпадающих жанров)
* добавление (и удаление) фильма в список 'Избранное' и 'Посмотреть позже' по клику на соответствующую иконку
* получение комментариев для выбранного фильма
* возможность оставить комментарий с помощью формы

> На каждой странице присутствует боковая панель со списками 'Избранное' и 'Посмотреть позже'

## Стек
* React + JS
* React Bootstrap
* Redux Toolkit
* React Router DOM

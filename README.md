[![Netlify Status](https://api.netlify.com/api/v1/badges/c75b50ca-93dd-40fd-b4eb-6a90afb6dfc1/deploy-status)](https://app.netlify.com/sites/raiffeisen-credit/deploys)

# Лендинг кредитной карты Райффайзен банка

Верстка для тестового задания
[raiffeisen-credit.netlify.app](https://raiffeisen-credit.netlify.app/)

## Адаптив

Макет имеет только 2 версии, без промежуточного состояния.
Чтобы не отображалась узкая мобильная версия на разрешении 800 точек и больше, заложено сразу же некоторое перестроение блоков.

## Доступность

В зависимости от ситуации используется как доступное, так и недоступное скрытие контента.
Заголовки для секций и тексты кнопок скрыты доступно6 чтобы они могли быть прочитаны скринридерами.
Текст, который меняется в зависимости от мобильной/десктопной версии скрывается недоступно, чтобы для скринридеров он читался так же, как на макете.

Интерактивные элементы попадают в фокус с клавитатуры, для их работы используется полифилл [focus-visible](https://github.com/WICG/focus-visible)

## JavaScript

Для работы слайдера использован [tiny-slider](https://github.com/ganlanyuan/tiny-slider)

Для формы с ценой написан скрипт, но подсчет платежа упрощен. Наверняка там должна быть более сложная формула расчета (которую можно встроить при необходимости), сейчас же это просто `сумма кредита + проценты по ставке / количество месяцев`.
Из-за упрощенной формулы в верстке отображается не такой ежемесячный платеж, как в макете.
Измененные данные формы отправляются (можно потестировтаь отправку).

## Lighthouse

Lighthouse выдает **86 / 97 / 100 / 95** для мобильного и **99 / 97 / 100 / 100** для десктопа.
Такая низкая оценка для мобильных из-за png-картинок в фонах. Google хочет видеть webp, но пока еще у него недостаточная поддержка в Safari, поэтому для фона я все еще использую png.
Есть способы это обойти, но для html-странички это перебор, пожалуй.

## Сборка

`npm start` or `gulp start`
Runs build and then server on localhost ([http://localhost:3000](http://localhost:3000) by default)

`npm test`
Runs stylelint and editorconfig (`npm run stylelint && npm run editorconfig`)

`npm run build` or `gulp build`
Runs build

`gulp` (dafault task) or `gulp serve`
Runs server on localhost ([http://localhost:3000](http://localhost:3000) by default) and watchers

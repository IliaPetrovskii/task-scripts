# Scripts

Установите зависимости:

```
npm install
```

В файле `src/index.html` добавьте на страницу следующие скрипты:

-   Встроенный скрипт, который будет исполнять следующий код:

```javascript
document.body.append('inline');
```

-   Внешний скрипт `src/scripts/sync.js`
-   Внешний скрипт `src/scripts/async.js` с атрибутом async
-   Внешний скрипт `src/scripts/defer.js` с атрибутом defer

Проверить себя можно запустив команду `npm run test -- --watchAll`.

После выполнения задания создайте pull request с решением.

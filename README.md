# MAYOT Partner Investment Landing

Односторінковий сайт для пояснення партнеру інвест-проєкту з інтерактивними калькуляторами:

- калькулятор залежності ціни від площі, локації та попиту;
- калькулятор витрат, прибутку і ROI.

## Запуск локально

```bash
python3 -m http.server 4173
```

Потім відкрийте `http://localhost:4173`.

## Деплой на GitHub Pages

У репозиторій додано workflow `.github/workflows/deploy-pages.yml`, який автоматично деплоїть сайт у GitHub Pages при push у гілки `main`, `master`, `work` або `codex/deploy-github-pages`.

1. У GitHub відкрийте **Settings → Pages**.
2. У полі **Source** виберіть **GitHub Actions**.
3. Запуште зміни у потрібну гілку — workflow сам виконає деплой.

Після успішного workflow сайт буде доступний за стандартним Pages URL вашого репозиторію.

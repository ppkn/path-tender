# path-tender
[Path Tender](https://path-tender.pages.dev/) is an app for logging active transportation improvements in your community.

## Development
```sh
npm run dev
```

[Install pocketbase](https://pocketbase.io/docs/) and move the extracted executable to `./db/`
and in a separate terminal

```sh
./db/pocketbase serve --dev
```

## Deploy
The backend/frontend deploys happen automatically on push to `main`.

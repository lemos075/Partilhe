# Partilhe

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.1.4.

## Development server

To start the server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. 

## Backend

The FastAPI backend is in `../api-backend`. Copy `.env.example` to `.env` and
fill in the MySQL and Cloudinary credentials. `AUTH_SECRET` is required and
must be a long random value; it signs the authentication tokens returned by
`/api/login`.

Start the backend from the repository root with:

```bash
python -m uvicorn main:app --app-dir api-backend --reload
```

The Angular application stores the login token and sends it as a Bearer token
automatically. The backend derives the current user from that token instead of
trusting user IDs sent by the browser.

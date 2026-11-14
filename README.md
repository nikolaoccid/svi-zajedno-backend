# Svi Zajedno API

Backend for an activity and attendance tracker used by the Croatian NGO Svi Zajedno. It started as my bachelor's thesis and has been in production since 2023.

The web client is in [svi-zajedno-frontend](https://github.com/nikolaoccid/svi-zajedno-frontend).

## What it does

- Tracks activities, categories and which students attended what, per school year
- Role-based access: admin and regular users, with login requests that an admin approves
- Statistics per school year for project associates and project users
- Excel export of project users (ExcelJS)
- OpenAPI docs served at the root path; the frontend generates its API client from them

## Stack

NestJS 9, TypeORM, PostgreSQL, JWT auth, Swagger (OpenAPI), class-validator.

## Run it locally

```bash
cp .env.example .env        # fill in the values
docker compose up -d        # Postgres 14, needs POSTGRES_PASSWORD in .env
npm install
npm run start:dev           # http://localhost:3001, Swagger UI at /
```

## Configuration

| Variable | Purpose |
|---|---|
| `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` | PostgreSQL connection |
| `DATABASE_DISABLE_SSL` | `true` for a local database without SSL |
| `JWT_SECRET`, `SESSION_SECRET` | Signing keys; use long random values |
| `PORT` | Defaults to 3001 |
| `ENV_NAME` | Environment label |

No secrets are committed. Production values live in the deploy environment.

## Layout

`src/` has one module per domain: `activity`, `category`, `school-year`, `student-on-activity`, `student-on-school-year`, `project-associate`, `project-user`, `contact`, `user-request`, `users`, `auth`, `statistics`, `export`.

## Status

Production code from a thesis project. It has no automated tests yet.

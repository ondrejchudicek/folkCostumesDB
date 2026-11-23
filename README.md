# folkCostumesDB

A web application for viewing and uploading 3D scans of folk costumes.
Built using React, TypeScript, TailWind and Nest.js

Under construction, being converted from vanilla JS+CSS https://github.com/ondrejchudicek/costumePresentationApp

# Installation

Requires Node.js: https://nodejs.org/en/download

Install dependencies:

```bash
cd ./apps/client
npm Install

cd ../server
npm Install

cd ../..
npm Install
```

The application uses Postgres tested in Docker. For initializing the testing database use the provided apps/server/src/db/seed.ts and apps/server/docker-compose.yml

Setup Docker:

```bash
npm run db:up
```

Init database:

```bash
npm run db:seed
```

Run the application in development mode. It will be available at http://localhost:5173/

```bash
npm run dev
```

Shutdown Docker after testing:

```bash
npm run db:down
```

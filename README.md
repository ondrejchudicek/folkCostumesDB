Tested on Firefox.
The app currently likely won't work on Chrome.

# folkCostumesDB

A web application for viewing and uploading 3D scans of folk costumes.
Built using React, TypeScript, TailWind and Nest.js

Under construction, being converted from vanilla JS+CSS https://github.com/ondrejchudicek/costumePresentationApp

# Installation

Requires Node.js: https://nodejs.org/en/download

Install dependencies:

```bash
cd ./apps/client
npm install

cd ../server
npm install

cd ../..
npm install
```

The application uses Postgres tested in Docker. For initializing the testing database use the provided _apps/server/src/db/seed.ts_ and _apps/server/docker-compose.yml_

Setup your database environment varibles. You can use the provided _apps/server/.env.example_ config file by renaming it to _.env_:

```bash
cp ./apps/server/.env.example ./apps/server/.env
```

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

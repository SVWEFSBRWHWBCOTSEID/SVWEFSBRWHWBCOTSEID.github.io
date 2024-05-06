# game-website
Website for playing silly games online.

### About
The design of this website was heavily inspired by [lichess.org](https://lichess.org/).
The concept of Pokemon Chess was borrowed from [pokemonchess.com](https://pokemonchess.com/).

### Running locally
This repository is a monorepo containing both the frontend and backend projects. Within this repository,
- `/client` houses Gulpin's Next.js frontend.
- `/server` houses Gulpin's Rust (actix-web) backend.

You'll need to create a `.env` file at `/server` pointing to your host, port, local database URLs, and AWS secrets.
The file should look something like:
```
HOST="127.0.0.1"
PORT=8080
DATABASE_URL="postgres://[username]:[password]@localhost:5432/game-db"
REDIS_URL="redis://127.0.0.1:6379"
DOMAIN="127.0.0.1"

AWS_ACCESS_KEY_ID="..."
AWS_SECRET_ACCESS_KEY="..."
```

Run
```bash
docker-compose up --build
```
to build and run the frontend and backend simultaneously. To run each component manually, see below.

#### Frontend
Make sure you have a compatible version of [Node](https://nodejs.org/en) installed. If you haven't already, install the
required dependencies with
```shell
npm install
```
This website is built with TypeScript, [TailwindCSS](https://tailwindcss.com/docs/utility-first), and [Next.js 13](https://nextjs.org/docs).
To run the website locally,
```shell
npm run dev
```
will start the Next.js development server on `127.0.0.1:3000`.

#### Backend
Make sure you have a compatible version of [Rust](https://www.rust-lang.org/tools/install) and
[Postgres](https://www.postgresql.org/download/) installed.

The backend expects a Postgres database named `game-db` to be running on `localhost:5432`. To create one, run
```shell
createdb game-db
```

You'll also need a Redis service running on `redis://127.0.0.1:6379`. Install Redis on Ubuntu via `apt-get`:
```shell
sudo apt-add-repository ppa:redislabs/redis
sudo apt-get update
sudo apt-get upgrade
sudo apt-get install redis-server
```
Run
```shell
sudo service redis-server restart
```
to start the service on `127.0.0.1:6379`.[^1]

[^1]: If you're on Windows, you'll have to [install and run Redis via WSL](https://developer.redis.com/create/windows/).

To regenerate the Prisma schema with the new config, run
```shell
cargo prisma db push
```
Afterwards, running
```shell
cargo run
```
will start the server locally on `127.0.0.1:8080`.

### Architecture
<!-- ... -->
Backend fetches are cached using [Next 13's data fetching API](https://nextjs.org/docs/app/building-your-application/data-fetching)
to eliminate unnecessary queries. Specifically,

- User objects from `/api/user/{username}` are cached under the `user-{username}` tag and revalidated on-demand when the
user object changes (when that user registers for an account, starts or finishes a game, edits their profile, etc.)

<!-- TODO: not true? -->
- Game info from `/api/game/{id}` is cached under the `game-{id}` tag and revalidated on-demand when a new game under that
id is created.

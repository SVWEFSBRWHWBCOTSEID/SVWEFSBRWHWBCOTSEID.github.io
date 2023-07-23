# game-website
Website for playing silly games online.

### About
The design of this website was heavily inspired by [lichess.org](https://lichess.org/).
The concept of Pokemon Chess was borrowed from [pokemonchess.com](https://pokemonchess.com/).

### Running locally
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

Many parts of the website expect the backend server to be running on `127.0.0.1:8080`. See the [backend README](https://github.com/SVWEFSBRWHWBCOTSEID/game-website-backend)
for how to set up and run the development server.

### Architecture
<!-- ... -->
Backend fetches are cached using [Next 13's data fetching API](https://nextjs.org/docs/app/building-your-application/data-fetching)
to eliminate unnecessary queries. Specifically,

- User objects from `/api/user/{username}` are cached under the `user-{username}` tag and revalidated on-demand when the
user object changes (when that user registers for an account, starts or finishes a game, edits their profile, etc.)

<!-- TODO: not true? -->
- Game info from `/api/game/{id}` is cached under the `game-{id}` tag and revalidated on-demand when a new game under that
id is created.

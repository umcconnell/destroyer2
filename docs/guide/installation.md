# Installation

To install Destroyer2, start by cloning the code:

```bash
git clone https://github.com/umcconnell/destroyer2.git
cd destroyer2
```

::: tip REQUIREMENTS
If you are planning to deploy or develop Destroyer2 with Docker™ containers,
make sure you have `docker` and `docker-compose` installed on your machine.
Check out the [Docker™ docs](https://docs.docker.com/get-docker/) for
installation instructions.

To deploy or develop Destroyer2 without Docker™, you'll need `node` with `npm`
and `redis` installed on your machine. Check out the
[Node.js™](https://nodejs.org/en/) and [Redis™](https://redis.io/download) docs
respectively for installation instructions.
:::

## Production

If you are using Docker™ containers to deploy Destroyer2, you are done! Head
over to the [Docker instructions](./docker.md) to quickly deploy.

For a plain installation with npm, run this command to install all production
dependencies:

```bash
npm install --only=production
```

Assuming you have Redis™ installed, you can now start the database in a
different shell:

```bash
cd path/to/destroyer2/db/
redis-server
# If you have a redis configuration file, instead run:
# redis-server redis.conf
```

Head back to your first shell and start the Node.js™ server:

```bash
npm run start
```

Open [http://localhost:8080](http://localhost:8080) in your browser to start
playing :rocket:

## Development

To develop Destroyer2 you must install all dependencies, including the developer
dependencies:

```bash
npm install
```

Head over to a new shell to start the database:

```bash
cd path/to/destroyer2/db/
redis-server
# If you have a redis configuration file, instead run:
# redis-server redis.conf
```

Back in the first shell, you can then start the game server:

```bash
npm run dev
```

Navigate to [http://localhost:8080](http://localhost:8080) to get started!

## Docs

To improve the docs, run the Vuepress dev server:

```bash
npm run docs:dev
```

No need to reload while writing as Vuepress offers hot reloading :smile:

Visit [http://localhost:8000](http://localhost:8000) to see the docs.

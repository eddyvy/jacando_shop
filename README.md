# Jacando Shop

Full Stack application done with NodeJS, MongoDB, Apollo GraphQL and ReactJS for the interview's code challenge.

## Requirements to use the app locally

- [Node.js](https://nodejs.org/es/)

- [Yarn](https://yarnpkg.com/) (Chosen package manager)

- [Docker](https://www.docker.com/)

To run the app it will require to have the ports 80, 4000 and 27017 free for the frontend server, the backend server and the mongodb server respectively

## Environment variables

Files with required environment variables have been provided (files `.env` and `.test.env`).

In a real application that environment variables would not be added to the repository and keep them secret.

## Start

To start the app using docker first build the images:

```shell
yarn build
```

To start the services use:

```shell
yarn up
```

After completion just visit [http://localhost](http://localhost)

## Fixtures

Once the database is created with Docker it will not have any data to show. For that reason and for the exercise purposes, it is provided a public endpoint to reset all the database and populate it, so it can be tested with some data. That endpoint can be used with the button "RESET DATA" that appears at the Home page.

## Testing

Backend tests will not require de containers to be running:

```shell
yarn test:back
```

Frontend tests will require to have almost the frontend docker container running and to have installed [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress). For running that tests use:

```shell
yarn test:front
```

## API Documentation

API documentation have been done with Postman and can be found at the next [link](https://documenter.getpostman.com/view/14255685/2s83S2DE4X).

Apart of the `/health` and `/fixtures` endpoints the rest of the api is based in Graphql. The instrospection to see the schema can be used in development mode.

## Development

For running the app in development mode it is require to navigate to either `./frontend` or `./backend` folder and run:

```shell
yarn install

yarn dev
```

In both services can be execute a build application with the commands:

```shell
yarn install

yarn build

yarn preview
```

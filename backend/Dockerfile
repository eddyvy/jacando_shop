FROM node:18-alpine AS builder

RUN mkdir /app

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM node:18-alpine

RUN mkdir /app

WORKDIR /app

RUN mkdir ./dist

COPY --from=builder /app/package.json /app
COPY --from=builder /app/yarn.lock /app
COPY --from=builder /app/dist /app/dist

RUN yarn install --production

EXPOSE ${APP_PORT}

CMD ["yarn", "start"]

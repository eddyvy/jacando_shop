FROM node:18-alpine AS builder

RUN mkdir /app

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

FROM nginx:stable-alpine AS runner

COPY nginx/default.conf /etc/nginx/conf.d/
COPY entry_point.sh /

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["sh", "/entry_point.sh"]
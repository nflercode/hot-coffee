FROM node:14.5.0-alpine3.10 as build

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install --silent

COPY . .

RUN npm run build

FROM node:14.5.0-alpine3.10

RUN docker volume rm hot-coffee_web-root

WORKDIR /app

COPY --from=build /app/build /app/build
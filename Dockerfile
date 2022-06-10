FROM node:15.1.0-buster-slim as build

ARG BUILD_MODE=dev

WORKDIR /app
COPY . .

RUN apt-get -y update
RUN apt-get -y install git

RUN npm install
RUN npm run build:$BUILD_MODE

FROM node:15.1.0-buster-slim

COPY --from=build /app/build /build
RUN npm install -g serve

CMD ["serve", "-s", "build"]
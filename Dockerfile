FROM node:15.1.0-buster-slim as build

WORKDIR /app
COPY . .
RUN npm install --production
RUN npm run build

FROM node:15.1.0-buster-slim

COPY --from=build /app/build /build
RUN npm install -g serve

CMD ["serve", "-s", "build"]
# pull official base image
FROM node:14.5.0-alpine3.10 as build

# set working directory
WORKDIR /app

COPY package.json .
COPY package-lock.json .

# install app dependencies
RUN npm install --silent

COPY . .

RUN npm run build

FROM node:14.5.0-alpine3.10

RUN npm install serve -g
COPY --from=build /app/build /build

# start app
EXPOSE 5000
CMD ["serve", "-s", "/build"]
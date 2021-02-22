FROM node:14-alpine
RUN mkdir /code
WORKDIR /code
COPY . .
RUN yarn install --frozen-lockfile
# syntax=docker/dockerfile:1
FROM node:14-alpine3.10
RUN mkdir /app
WORKDIR /app
COPY . /app
RUN yarn --pure-lockfile

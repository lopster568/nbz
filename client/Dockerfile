### Stage 1
FROM node:19-slim AS builder

WORKDIR /usr/src/app
COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install 
COPY . .

ARG BASE_URL
ENV REACT_APP_BASE_URL=${}

RUN npm build

### Stage 2
### copy to caddy
FROM caddy: 2.6.4-alpine

ARG CADDYFILE 
COPY ${CADDYFILE} /etc/caddy/Caddyfile

COPY --from=builder /usr/src/app/build/ /srv
EXPOSE 80
EXPOSE 443
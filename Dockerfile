# Build stage
FROM node:lts-slim as build
WORKDIR /node-app-build
COPY ["package.json", "yarn.lock", "./"]
RUN yarn install
COPY  . .
RUN yarn run build

# Package stage
FROM node:lts-slim as pkg
WORKDIR /node-app-pkg
COPY --from=build ["/node-app-build/package.json", "/node-app-build/yarn.lock", "./"]
RUN yarn install --production=true

# Final stage
FROM node:lts-slim as final
WORKDIR /node-app
LABEL maintainer="Md. Redwan Hossain"
USER node
COPY --from=build --chown=node:node ["/node-app-build/dist", "/node-app/dist"]
COPY --from=pkg --chown=node:node ["/node-app-pkg/node_modules", "/node-app/node_modules"]
EXPOSE 8000
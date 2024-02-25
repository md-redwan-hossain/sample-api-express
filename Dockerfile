FROM node:lts-slim
LABEL maintainer="Md. Redwan Hossain"
USER node
WORKDIR /node-app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install
COPY --chown=node:node . .
RUN yarn run build
EXPOSE 8000

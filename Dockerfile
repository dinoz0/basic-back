# syntax=docker/dockerfile:1.4

# if you're doing anything beyond your local machine, please pin this to a specific version at https://hub.docker.com/_/node/
FROM node:lts-alpine AS development

# set our node environment, either development or production
# defaults to production, compose overrides this to development on build and run
ARG NODE_ENV=production
ENV NODE_ENV $NODE_ENV

WORKDIR /code

# default to port 80 for node
ARG PORT=80
ENV PORT $PORT
EXPOSE $PORT

COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json
RUN npm ci

FROM node:lts-alpine AS final

ENV NODE_PATH=/home/node/node_modules:/node_modules
ENV NODE_ENV=production

WORKDIR /home/node

COPY --from=development --chown=node:node /code/node_modules/ ./node_modules/
COPY --chown=node:node package.json ./

RUN chmod -R 755 /home/node/

USER node


# check every 30s to ensure this service returns HTTP 200
HEALTHCHECK --interval=30s \
  CMD node healthcheck.js

# copy in our source code last, as it changes the most
COPY --chown=node:node models/ ./models/
COPY --chown=node:node routes/ ./routes/
COPY --chown=node:node jsonwebtoken/ ./jsonwebtoken/
COPY --chown=node:node *.js ./
COPY --chown=node:node *.json ./

# if you want to use npm start instead, then use `docker run --init in production`
# so that signals are passed properly. Note the code in index.js is needed to catch Docker signals
# using node here is still more graceful stopping then npm with --init afaik
# I still can't come up with a good production way to run with npm and graceful shutdown
CMD [ "node", "server.js" ]

FROM node:slim

USER node

WORKDIR /books

COPY --chown=node:node package*.json .
COPY --chown=node:node index.js .
COPY --chown=node:node public/favicon.ico ./public/favicon.ico

RUN npm install

CMD ["node", "index.js"]

EXPOSE 3000

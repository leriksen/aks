FROM node:slim

USER node

WORKDIR /books

COPY --chown=node:node package*.json .
COPY --chown=node:node index.js .
COPY --chown=node:node public public

RUN npm install

RUN mkdir -p data/books

CMD ["node", "index.js"]

EXPOSE 3000

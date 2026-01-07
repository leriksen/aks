FROM node:slim

WORKDIR /books

COPY package*.json .
COPY index.js .

RUN npm install

CMD ["node", "index.js"]

EXPOSE 3000
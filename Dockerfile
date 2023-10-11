FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY .github/workflows .

EXPOSE 3000

CMD ["node", "./src/app.js"]

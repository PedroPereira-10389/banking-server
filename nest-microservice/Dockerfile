FROM node:16 as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 5000/tcp
RUN npm run build

CMD [ "node", "dist/main.js" ]
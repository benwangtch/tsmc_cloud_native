FROM node
WORKDIR /app

COPY package-lock.json .
COPY package.json .

RUN npm install

COPY . .

EXPOSE 4000
CMD npm run server
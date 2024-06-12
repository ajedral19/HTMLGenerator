FROM node:18.18.0

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3800

CMD ["npm", "run", "dev"]
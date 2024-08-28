FROM node:20-alpine

ENV DATABASE_HOST mongo-db
ENV DATABASE_NAME HTMLGenerator

WORKDIR /app

COPY package.json .

RUN apk add chromium

RUN npm install

COPY . .

EXPOSE 9100

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]
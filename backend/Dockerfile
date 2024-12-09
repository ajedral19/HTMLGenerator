FROM node:20-alpine

ENV DATABASE_HOST=mongo-db
ENV DATABASE_NAME=HTMLGenerator
ENV CLIENT_EMAIL="htmlgenerator@html-generator-422807.iam.gserviceaccount.com"
ENV PRIVATE_KEY="paste the key here"

WORKDIR /app

COPY package.json .

RUN apk add chromium

RUN npm install && npm audit fix

COPY . .

EXPOSE 9100

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]

FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN apk add chromium

RUN npm install

COPY . .

EXPOSE 9100

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]
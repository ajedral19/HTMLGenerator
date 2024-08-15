FROM node:20-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3800

CMD ["npm", "run", "dev"]
# CMD ["npm", "start"]
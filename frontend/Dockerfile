FROM node:20-alpine

WORKDIR /app

ENV BASE_URL=http://nodejs-api:9100

COPY package.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3800

# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]
FROM node:16-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build

EXPOSE 3001

ENV VITE_SERVER=

CMD ["npm", "run", "preview"]

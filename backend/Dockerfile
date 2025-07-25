FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

# Crea el directorio uploads si no existe
RUN mkdir -p ./uploads

CMD ["npm", "run", "start:prod"]

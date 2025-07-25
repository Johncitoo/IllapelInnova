# Etapa 1: Build con Node
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: Servir estáticos con nginx
FROM nginx:stable-alpine

# Elimina la configuración por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia el build de Vite al directorio de nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Opcional: copia una configuración personalizada de nginx si tienes una
# COPY nginx.conf /etc/nginx/nginx.conf

# Expone el puerto 80 por defecto
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

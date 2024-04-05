#seleccionar la imagen
FROM node:20-alpine

#espacio de trabajo
WORKDIR /app

#copiamos el archivo package.json
COPY package*.json ./

#ejecutamos las instalaciones de las dependencias
RUN npm install

#copiamos los demas archivos que esten en el proyecto
COPY . ./

#ejecutamos el proyecto
CMD ["npm" , "start"]
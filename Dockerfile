# Use Node.js as the base image
FROM node:18


WORKDIR /myApp


COPY myApp/package*.json ./

RUN npm install -g expo-cli @expo/ngrok

RUN npm install

COPY myApp ./


EXPOSE 19000 8081
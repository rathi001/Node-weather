FROM node:latest
COPY . /app
WORKDIR /app
RUN npm install
EXPOSE 80
CMD node js.js
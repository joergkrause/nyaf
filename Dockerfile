FROM node:12
WORKDIR /app
COPY package.json /app
RUN npm i
COPY . /app
EXPOSE 9000
CMD npm run build

FROM node:14

WORKDIR /wefox
COPY package.json .
RUN npm install
COPY . .
CMD npm start
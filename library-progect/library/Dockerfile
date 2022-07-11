FROM node

WORKDIR /app

COPY ./package*.json ./
COPY ./tsconfig.json ./
RUN npm install
COPY src ./src
RUN npm run build:prod

CMD ["npm", "run", "start"]

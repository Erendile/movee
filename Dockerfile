FROM node:18-alpine

WORKDIR /app

COPY .yarn ./.yarn
COPY .yarnrc.yml ./
COPY package.json yarn.lock ./

RUN yarn set version 3.6.0
RUN yarn install

COPY . .

RUN yarn build
RUN ["chmod", "+x", "./start.sh"]

USER node

ENTRYPOINT ["./start.sh"]
CMD ["node", "./dist/main.js"]
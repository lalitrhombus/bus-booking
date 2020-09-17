FROM node:12-alpine

# RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
COPY ./ app/

WORKDIR /app

ENV APP_ID=bus-booking
ENV PORT=8080
ENV LOG_LEVEL=debug

RUN npm install
RUN npm run compile

EXPOSE 8080

CMD [ "npm", "start"]
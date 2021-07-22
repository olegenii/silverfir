FROM node:14.4.0-stretch-slim
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/out && mkdir -p /home/node/app/in  && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY --chown=node:node . .
USER node
RUN npm install
EXPOSE 8081
CMD [ "node", "app.js" ]
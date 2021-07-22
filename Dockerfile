FROM node:14.4.0-stretch-slim
RUN mkdir -p /home/node/app/node_modules && mkdir -p /home/node/app/out  && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN npm install node-whois && npm install express && npm install node-fetch && npm install fs && npm install moment
COPY --chown=node:node . .
EXPOSE 8081
CMD [ "node", "app.js" ]

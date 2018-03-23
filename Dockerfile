FROM node:latest
EXPOSE 3000

COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

RUN mkdir -p /home/node/app/
COPY package.json package-lock.json /home/node/app/
WORKDIR /home/node/app/
RUN npm install
COPY . /home/node/app/

USER node
ENTRYPOINT [ "docker-entrypoint.sh" ]

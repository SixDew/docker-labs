FROM node:lts-bookworm
WORKDIR /root
COPY ./front /root
RUN npm install
ENTRYPOINT [ "npm", "run", "dev" ]
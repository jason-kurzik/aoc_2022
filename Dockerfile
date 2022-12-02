FROM node:19
WORKDIR /usr/src/app

RUN apt-get update && apt-get install -y vim


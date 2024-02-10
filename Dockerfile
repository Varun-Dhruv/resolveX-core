FROM node:20-alpine

# Create app directory
WORKDIR /code

# Install app dependencies
COPY package.json /code

COPY yarn.lock /code

RUN yarn install

# Bundle app source
COPY . /code



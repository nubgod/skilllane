
FROM node:14-alpine3.12

# Create app directory
WORKDIR /usr/src/app

# Installs latest Chromium (89) package.
RUN apk add --no-cache \
      chromium \
      nss \
      freetype \
      harfbuzz \
      ca-certificates \
      ttf-freefont \
      nodejs \
      yarn

# Install app dependencies
COPY package*.json ./
RUN npm install

# From current dir to workdir in container.
COPY . .
RUN npm run build

# Open port 8000 in container
EXPOSE 3000
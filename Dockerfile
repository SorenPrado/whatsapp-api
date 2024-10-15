# Use Node.js 16 Alpine (mais recente e estável que 14)
FROM node:16-alpine

# Set the working directory
WORKDIR /usr/src/app

# Install Git and Chromium (along with necessary dependencies)
ENV CHROME_BIN="/usr/bin/chromium-browser" \
    PUPPETEER_SKIP_CHROMIUM_DOWNLOAD="true" \
    NODE_ENV="production"

RUN set -x \
    && apk update \
    && apk upgrade \
    && apk add --no-cache \
    git \
    udev \
    ttf-freefont \
    chromium

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci --only=production --ignore-scripts

# Copy the rest of the source code to the working directory
COPY . .

# Definir permissões corretas
RUN chmod +x /usr/src/app

# Expose the port the API will run on
EXPOSE 3000

# Start the API
CMD ["npm", "start"]

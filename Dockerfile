# The image is built on top of one that has node preinstalled
FROM node:16-alpine

# update and install dependency
RUN apk update && apk upgrade

# set destination directory
WORKDIR /app

# Copy all files into the container
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Open appropriate port 
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]
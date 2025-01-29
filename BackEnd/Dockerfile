# Use the official Node.js LTS version as a base image
FROM node:18-alpine

WORKDIR /BackEnd

COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on (if necessary, adjust the port number)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

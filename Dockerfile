# Use a Node.js image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the entire app's code into the container
COPY . .

# Expose the port the app runs on (default React is 3000)
EXPOSE 3000

# Start the React development server
CMD ["npm", "start"]

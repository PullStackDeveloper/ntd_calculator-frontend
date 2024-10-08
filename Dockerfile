# Use the official Node.js 20 image as a base image
FROM node:20.16.0

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port the app runs on
EXPOSE 3000

# Start the Next.js application
CMD ["yarn", "run", "start"]

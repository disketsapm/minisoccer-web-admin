# Use a smaller base image for Node.js 14
FROM node:20.9.0 AS builder

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json /

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Expose the application port
EXPOSE 3030

# Start the application
CMD ["npm", "start"]

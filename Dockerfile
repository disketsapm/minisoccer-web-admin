# Use official Node.js 14 image as base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json to workdir
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code to workdir
COPY . .

# Build Next.js application
RUN npm run build

# Expose port 3030
EXPOSE 3030

# Command to run the application
CMD ["npm", "start"]

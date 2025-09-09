FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json + lock file first (better cache handling)
COPY package.json package-lock.json* ./

# Install dependencies (this will include sass + bootstrap if they're in package.json)
RUN npm install

# Copy the rest of the code
COPY . .

# Build the Next.js app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start app
CMD ["npm", "start"]

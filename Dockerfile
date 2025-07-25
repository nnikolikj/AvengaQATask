FROM mcr.microsoft.com/playwright:v1.54.1-jammy

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy all project files
COPY . .

# Default command to run tests
CMD ["npx", "playwright", "test"]

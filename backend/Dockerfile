# syntax=docker/dockerfile:1

FROM node:20-alpine
WORKDIR /app
# Install only production deps
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the rest of the app
COPY . .
# Port and command
EXPOSE 4000
CMD ["npm", "start"]
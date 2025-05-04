# Install dependencies
FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN yarn install && yarn build cf-prep-webapp

# Serve with Next.js
FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3000
CMD ["node", "main.js"]

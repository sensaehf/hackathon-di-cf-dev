# ---------- Builder Stage ----------
    FROM node:20-alpine AS builder

    WORKDIR /app
    
    # Install dependencies first for caching
    COPY .yarn .yarn
    COPY .yarnrc.yml package.json yarn.lock ./
    RUN yarn install
    
    # Copy the full repo and build the target app
    COPY . .
    
    # Build only the target app
    RUN yarn build tax-return-backend
    
    # ---------- Runtime Stage ----------
    FROM node:20-alpine
    
    WORKDIR /app
    
    # Install only prod dependencies (if needed)
    COPY .yarn/ .yarn/
    COPY .yarnrc.yml package.json yarn.lock ./
    RUN yarn config set enableGlobalCache false
    RUN corepack enable && yarn workspaces focus --production tax-return-backend
    # Copy built output from builder stage
    COPY --from=builder /app/dist/apps/tax-return/backend ./dist
    
    EXPOSE 3000
    
    CMD ["node", "dist/main.js"]
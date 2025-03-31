FROM node:18-alpine

WORKDIR /app

# 1. Install pnpm globally
RUN npm install -g pnpm

# 2. Copy root config files
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./

# 3. Install root dependencies
RUN pnpm install --frozen-lockfile

# 4. Copy shared packages
COPY packages/ ./packages/

# 5. Copy app files (package.json first for better caching)
COPY apps/notes-app/package.json ./apps/notes-app/
COPY apps/notes-app/ ./apps/notes-app/

# 6. Install app dependencies
RUN pnpm --filter @nopen/notes-app install

# 7. Expose Vite dev server port
EXPOSE 3002

CMD ["sh"]

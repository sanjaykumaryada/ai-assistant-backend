FROM node:22
Workdir /app
Run npm install -g pnpm@12.15.0
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

RUN pnpm install  --frozen-lockfile
COPY tsconfig.json ./

COPY src ./src

RUN pnpm build

EXPOSE 4000
CMD ["pnpm", "start"]


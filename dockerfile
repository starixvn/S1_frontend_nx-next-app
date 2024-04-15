FROM node:18-alpine AS builder

# alpine 輕量化 Image 不包含必要的 python 資源，需另外加載才可正確執行 npm 安裝指令
RUN apk add --no-cache libc6-compat python3 make g++

ARG project_name
ARG env

WORKDIR /build

# bind node_modules to bin/PATH
# 因為有用到 node_module內的 nx command
# 故需要綁定 docker bin path 否則會 command not found
ENV PATH /build/node_modules/.bin:$PATH
COPY . .
# copy env
COPY ./apps/${project_name}/.env.${env} ./apps/${project_name}/.env

# install
RUN npm ci --prefer-offline --no-audit --progress=false
RUN nx clear-cache
RUN app=${project_name} npm run build

FROM node:18-alpine AS serve-step

ARG project_name
ARG port
WORKDIR /app

# 指定 group 和使用者
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 將檔案綁定至 group 與使用者
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/.next/static ./dist/apps/${project_name}/.next/static
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/public ./apps/${project_name}/public

USER nextjs

# server.js 運行路徑
ENV APP_PATH=apps/${project_name}/server.js
EXPOSE ${port}
ENV PORT ${port}

CMD node $APP_PATH



FROM node:16.20.0-alpine AS dependencies
WORKDIR /app
ENV NPM_CACHE_FOLDER=/root/.npm
COPY package.json package-lock.json ./
RUN --mount=type=cache,target=$NPM_CACHE_FOLDER \
     npm ci --cache $NPM_CACHE_FOLDER

FROM node:16.20.0-alpine AS builder

# alpine 輕量化 Image 不包含必要的 python 資源，需另外加載才可正確執行 npm 安裝指令
RUN apk add --no-cache libc6-compat python3 make g++

ENV TEMPLATE_NAME nova88-desktop
ARG TRANSFORM_CONFIG

WORKDIR /build

# bind node_modules to bin/PATH
# 因為有用到 node_module內的 nx command
# 故需要綁定 docker bin path 否則會 command not found
ENV PATH /build/node_modules/.bin:$PATH
COPY . .
# copy env
COPY ./apps/${TEMPLATE_NAME}/.env.${TRANSFORM_CONFIG} ./apps/${TEMPLATE_NAME}/.env
COPY --from=dependencies /app/node_modules ./node_modules

RUN app=${TEMPLATE_NAME} npm run build

FROM node:16.20.0-alpine AS serve-step

WORKDIR /app
ENV TEMPLATE_NAME nova88-desktop
# 指定 group 和使用者
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# 將檔案綁定至 group 與使用者
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${TEMPLATE_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${TEMPLATE_NAME}/.next/static ./dist/apps/${TEMPLATE_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${TEMPLATE_NAME}/public ./apps/${TEMPLATE_NAME}/public

USER nextjs

# server.js 運行路徑
ENV APP_PATH=apps/${TEMPLATE_NAME}/server.js
EXPOSE 5000
ENV PORT 5000
CMD node $APP_PATH



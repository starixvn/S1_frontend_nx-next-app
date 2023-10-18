FROM node:16.20.0-alpine AS builder
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
RUN npm ci
RUN nx clear-cache
RUN app=${project_name} npm run build

FROM node:16.20.0-alpine AS serve-step

ARG project_name
ARG port
WORKDIR /app

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/.next/static ./dist/apps/${project_name}/.next/static
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${project_name}/public ./apps/${project_name}/public
RUN #npm i sharp

USER nextjs

EXPOSE ${port}

ENV APP_PATH=apps/${project_name}/server.js
ENV PORT ${port}

CMD node $APP_PATH



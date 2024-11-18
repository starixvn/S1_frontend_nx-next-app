FROM hub.nexdev.net/nexent/s1-ps-base:18-16-alpine-npm-cache-v1 AS builder

WORKDIR /build

# bind node_modules to bin/PATH
# Because it is useful to use the nx command in node_module
# Therefore, docker bin path needs to be bound, otherwise command not found will occur.
ENV PATH /build/node_modules/.bin:$PATH

# copy env
COPY package.json package-lock.json ./
RUN npm install --no-audit --progress=false --prefer-offline

COPY . .

ARG TRANSFORM_CONFIG
ENV TEMPLATE_NAME nova88-desktop
COPY ./apps/${TEMPLATE_NAME}/.env.${TRANSFORM_CONFIG} ./apps/${TEMPLATE_NAME}/.env

RUN app=${TEMPLATE_NAME} npm run build

FROM hub.nexdev.net/base/node:18-16-alpine-24h1.1 AS serve-step

WORKDIR /app
ENV TEMPLATE_NAME nova88-desktop
# Specify group and user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Bind files to groups and users
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${TEMPLATE_NAME}/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${TEMPLATE_NAME}/.next/static ./dist/apps/${TEMPLATE_NAME}/.next/static
COPY --from=builder --chown=nextjs:nodejs /build/dist/apps/${TEMPLATE_NAME}/public ./apps/${TEMPLATE_NAME}/public

USER nextjs

# server.js running path
ENV APP_PATH=apps/${TEMPLATE_NAME}/server.js
EXPOSE 5000
ENV PORT 5000
CMD node $APP_PATH



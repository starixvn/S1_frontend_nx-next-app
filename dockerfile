FROM node:16.15.1 AS build-step

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
RUN node SheetToJson.js
RUN nx clear-cache
RUN app=${project_name} npm run build

FROM node:16.20.0-alpine AS serve-step

ARG project_name
ARG port
WORKDIR /app

COPY --from=build-step /build/node_modules ./node_modules
COPY --from=build-step /build/dist/apps/${project_name} .

EXPOSE ${port}

ENV PORT ${port}

CMD ["npm", "start"]



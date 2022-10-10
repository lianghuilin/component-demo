FROM piaofutong/node:14.17.6-alpine3.14 AS build

ARG ENV=production

COPY . /usr/local/src

WORKDIR /usr/local/src

RUN yarn install && yarn run build-${ENV} --module stdv1 && ls -l

FROM nginx:1.21.3-alpine AS prod

COPY --from=build /usr/local/src/dist /var/www/html

RUN cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && apk del tzdata

WORKDIR /var/www/html

FROM node:12.19 as builder

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install
COPY . ./
RUN yarn build

# Traefik currently not supported hosting static files, so we decided used Nginx with the default config
FROM nginx:1.18
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
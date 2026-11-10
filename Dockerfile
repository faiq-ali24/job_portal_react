# Stage 1: build the static React bundle
FROM node:22-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY . .
# The domain is baked into the bundle at build time; ports are empty because
# nginx serves the app and proxies the API on the same origin (443).
ARG REACT_APP_BASE_DOMAIN
ENV REACT_APP_BASE_DOMAIN=$REACT_APP_BASE_DOMAIN \
    REACT_APP_APP_PORT= \
    REACT_APP_API_PORT= \
    GENERATE_SOURCEMAP=false
RUN npm run build

# Stage 2: nginx serves the bundle (its config is mounted in by docker compose)
FROM nginx:1.27-alpine
COPY --from=build /app/build /usr/share/nginx/html

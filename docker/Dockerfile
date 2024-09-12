# Use node 18 to build the static app
FROM node:18 AS build-stage

ARG REACT_APP_GOOGLE_BOOKS_API_KEY=''
ARG REACT_APP_BACKEND_URL=''

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json package.json
COPY yarn.lock yarn.lock

# Install npm dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

# Use nginx for the final image
FROM nginx:1.27.0-perl AS production-stage

LABEL org.opencontainers.image.source='https://github.com/petrosvoivontas/minigoodreads-fe'

# Environment variables
ENV BE_HOST=minigoodreads_be
ENV BE_PORT=8081

# Copy the static files to the nginx directory
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY docker/minigoodreads.nginx.j2 /etc/nginx/templates/nginx.conf.template

# # Delete the default conf file
# RUN rm /etc/nginx/conf.d/default.conf
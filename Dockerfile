FROM --platform=linux/amd64 node:20.5.0-bookworm-slim

# RUN apk update
RUN apt-get update

# RUN apk add --no-cache libc6-compat openssl \
#     make gcc g++ python3 pkgconfig pixman-dev cairo-dev pango-dev libjpeg-turbo-dev giflib-dev
RUN apt-get install \
    make gcc g++ python3 build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev -y

WORKDIR /usr/src/app

COPY . .

RUN npm install --include=optional sharp

CMD ["node", "app.js"]

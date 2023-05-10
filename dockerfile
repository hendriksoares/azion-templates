
FROM azionedge/scripts-base:alpine-3.16

RUN apk add curl nodejs npm bash git

ENV _ENVIRONMENT="production"

COPY . .

RUN npm i -g pnpm

RUN pnpm install
RUN pnpm run build

CMD ["node", "dist/main.js"]


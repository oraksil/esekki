FROM node:alpine

RUN mkdir -p /deploy
WORKDIR /deploy
COPY . /deploy

RUN npm ci

ENV NEXT_PUBLIC_API_BASEURL=https://api.oraksil.fun
ENV NEXT_PUBLIC_TURNSERVER_URLS=turn:turn.oraksil.fun:3478?transport=tcp
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

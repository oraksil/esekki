FROM node:12-alpine

RUN mkdir -p /deploy
WORKDIR /deploy
COPY . /deploy

RUN npm ci

ENV NEXT_PUBLIC_API_BASEURL=http://localhost:8000
ENV NEXT_PUBLIC_TURNSERVER_URLS=turn:localhost:3478?transport=tcp
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

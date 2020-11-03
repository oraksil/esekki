FROM node:alpine

RUN mkdir -p /deploy
WORKDIR /deploy
COPY . /deploy

RUN npm ci

ENV NEXT_PUBLIC_API_BASEURL=http://api.oraksil.fun
RUN npm run build

EXPOSE 3000
CMD ["npm", "start"]

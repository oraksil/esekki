# Esekki

A web application running on a browser. It provides user with games catalog and to play game. Game frames to be rendered and player control data are transfered via WebRTC session. So, any kind of clients can be possible if it supports WebRTC. Esseki is built on Next.js using redux, redux-saga together.

# Run

```bash
$ npm install
$ npm run dev
```

For `production` mode,
```bash
$ npm run start
```


## Environment Variables

|var|desc|default|
|-|-|-|
|PUBLIC_PROXY_HOST|Host to proxy pass for public(static) files|http://localhost:8000|
|NEXT_PUBLIC_API_BASEURL|API URL for next server to route|http://localhost:8000|
|NEXT_PUBLIC_TURNSERVER_URLS|TURN Server URL for next server to render to client|turn:localhost:3478?transport=tcp|

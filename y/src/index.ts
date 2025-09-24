import { https, setGlobalOptions } from 'firebase-functions';
import { default as next } from 'next';
import path = require('path');

const nextjsDistDir = path.join('..', '.next');

const nextjsServer = next({
  dev: false,
  conf: {
    distDir: nextjsDistDir,
  },
});
const nextjsHandle = nextjsServer.getRequestHandler();

setGlobalOptions({
  //...
});

export const server = https.onRequest((req, res) => {
  return nextjsServer.prepare().then(() => nextjsHandle(req, res));
});

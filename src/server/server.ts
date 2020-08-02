import http from 'http';
import https from 'https';
import koa from 'koa';
import config from './config';
import sslify from 'koa-sslify';
import fs from 'fs-extra';
import router from './router';
import serve from 'koa-static';
import { join } from 'path';
import bodyParser from 'koa-bodyparser';
import authenticate from './authenticate';

class Server {
  private app: koa = new koa();

  private httpServer: http.Server = http.createServer(this.app.callback());

  private httpsServer?: https.Server;

  public async init() {
    if (config.keyPath && config.certPath) {
      const [key, cert] = await Promise.all([
        await fs.readFile(config.keyPath).catch(error => {
          console.error(error);
          return undefined;
        }),
        await fs.readFile(config.certPath).catch(error => {
          console.error(error);
          return undefined;
        }),
      ]);

      if (key && cert) {
        this.app.use(sslify({ port: config.httpsPort }));
        this.httpsServer = https.createServer({
          key,
          cert,
        }, this.app.callback());
      }
    }

    this.app.use(authenticate);

    this.app.use(bodyParser());

    this.app.use(router.routes());

    this.app.use(serve(join(__dirname, '../../public'), {
      hidden: true,
      defer: true,
    }));

    this.app.use(serve(join(__dirname, '../public')));

  }

  public start() {
    this.httpServer.listen(config.httpPort, () => {
      console.log('Http server listening at http://localhost:' + config.httpPort);
    });

    this.httpsServer?.listen(config.httpsPort, () => {
      console.log('Https server listening at https://localhost:' + config.httpsPort);
    });
  }
}

const server = new Server();

server.init().then(() => server.start())

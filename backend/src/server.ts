import * as http from 'http';
import {App} from './app';

class MyServer {
  private PORT = 3000;
  private MAX = 2147483647;
  private httpServer = http.createServer(new App().getExpressApp());

  constructor() {
  }

  runServer(): void {

    const serv = this.httpServer.listen(this.PORT, () => {
      console.log(`Express server listening on port ${this.PORT}...`);
    });
    serv.setTimeout(this.MAX);
  }
}

new MyServer().runServer();

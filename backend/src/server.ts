import * as http from 'http';
import {App} from './app';

class MyServer {
  private PORT = 3000;
  private httpServer = http.createServer(new App().getExpressApp());

  constructor() {}

  runServer(): void {
    this.httpServer.listen(this.PORT, () => {
      console.log(`Express server listening on port ${this.PORT}...`);
    });
  }
}

new MyServer().runServer();

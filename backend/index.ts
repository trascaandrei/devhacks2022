import { App } from './src/app';
import { Config } from './src/config/config';

class Server {
    public async start() {
        try {
            await new App().start(Config.PORT);
        } catch (e) {
            console.error(e);
        }
    }
};

new Server().start();

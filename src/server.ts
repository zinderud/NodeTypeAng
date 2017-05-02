
import './controllers/usersController';
import "reflect-metadata";
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as methodOverride from 'method-override';
import { RegisterRoutes } from './routes';
import { ConfigProvider } from './ConfigProvider';
import { User } from './models/user';
import { createConnection } from 'typeorm'
class Startup{
  public server ()
  {
      let config : any = ConfigProvider;

      // create database connection 
      createConnection({
                  driver: {
                    type: config.type,
                    host: config.host,
                    port: config.post,
                    database: config.database,
                    username: config.username,
                    password: config.password
                  },
                  entities: [
                    User
                  ],
                  autoSchemaSync: true,
                }) .then(() => {
                     this.startExpressServer();
                  });
  }

private startExpressServer(){
 
      const app = express();
app.use('/docs', express.static(__dirname + '/swagger-ui'));
app.use('/swagger.json', (req, res) => {
    res.sendFile(__dirname + '/swagger.json');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride());

RegisterRoutes(app);

/* tslint:disable-next-line */
console.log('Starting server on port 3000...');
app.listen(3000);
}
 }
 let startup = new Startup(); 
startup.server();
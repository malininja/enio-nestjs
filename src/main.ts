import { HttpServer } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { join } from 'path';
import { AppModule } from './app.module';

function homeRouter(httpServer: HttpServer): void {
  const basePath = '../static/views/home/';

  httpServer.get('/', (req, res) =>
    res.render(`${basePath}index`, { title: 'home' }),
  );
  httpServer.get('/home/pdv', (req, res) =>
    res.render(`${basePath}pdv`, { title: 'Pdv' }),
  );
  httpServer.get('/home/tarifa', (req, res) =>
    res.render(`${basePath}tarifa`, { title: 'Tarife' }),
  );
  httpServer.get('/home/partner', (req, res) =>
    res.render(`${basePath}partner`, { title: 'Partneri' }),
  );
  httpServer.get('/home/artikl', (req, res) =>
    res.render(`${basePath}artikl`, { title: 'Artikli' }),
  );
  httpServer.get('/home/firma', (req, res) =>
    res.render(`${basePath}firma`, { title: 'Postavke' }),
  );
  httpServer.get('/home/racun-list', (req, res) =>
    res.render(`${basePath}racun-list`, { title: 'Lista računa' }),
  );
  httpServer.get('/home/racun-edit', (req, res) =>
    res.render(`${basePath}racun`, { title: 'Računnnnn' }),
  );
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log('PATH', join(__dirname, 'static'));
  const httpAdapter: HttpServer = app.getHttpAdapter();
  homeRouter(httpAdapter);

  // httpAdapter.set('view engine', 'ejs');
  // httpAdapter.set('views', __dirname + '/views');
  // httpAdapter.use(express.static(path.join(__dirname, 'static')));
  httpAdapter.setViewEngine('ejs');
  await app.listen(3000);
}
bootstrap();

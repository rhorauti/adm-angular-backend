import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { dataSource } from './migrations';
import 'reflect-metadata';
import './containers';
import { router } from './routes';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger.json';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

dataSource
  .initialize()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Application is listening on port ${process.env.PORT}`);
    });
  })
  .catch((e: unknown) => {
    console.log(e as Error);
  });

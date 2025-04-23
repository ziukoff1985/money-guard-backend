import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import router from './routes/index.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      origin: [
        'http://localhost:5173',
        'http://localhost:5174',
        'https://team-money-guard.vercel.app',
      ],
      credentials: true,
      optionsSuccessStatus: 200,
    }),
  );

  app.use('/api-docs', swaggerDocs());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'yyyy-mm-dd HH:MM:ss',
        },
      },
    }),
  );
  app.use(cookieParser());
  app.get('/', (req, res) => {
    res.json({
      status: 200,
      message: 'Welcome to Money Guard API!!!',
      timestamp: new Date().toISOString(),
    });
  });

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

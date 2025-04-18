import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';

import { getEnvVar } from './utils/getEnvVar.js';

dotenv.config();

const PORT = Number(getEnvVar('PORT', 3000));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
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
  app.get('/', (req, res) => {
    res.json({
      status: 200,
      message: 'Welcome to Money Guard API!',
      timestamp: new Date().toISOString(),
    });
  });

  app.use('*', (req, res) => {
    res.status(404).json({ message: 'Page Not found' });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

import jwt from 'jsonwebtoken';
import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { UserCollection } from '../db/models/user.js';
import { getEnvVar } from '../utils/getEnvVar.js';

// Middleware для авторизації користувача за JWT-токеном
export const authenticate = async (req, res, next) => {
  try {
    // Отримуємо заголовок Authorization
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      throw createHttpError(401, 'Authorization header missing');
    }

    // Перевіряємо формат заголовка (Bearer <token>)
    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw createHttpError(
        401,
        'Invalid authorization format. Use Bearer token',
      );
    }

    // Верифікуємо JWT-токен
    let decoded;
    try {
      decoded = jwt.verify(token, getEnvVar('JWT_SECRET'));
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw createHttpError(401, 'Token expired');
      }
      throw createHttpError(401, 'Invalid token');
    }

    // Перевіряємо сесію в SessionCollection
    const session = await SessionCollection.findOne({ accessToken: token });
    if (!session) {
      throw createHttpError(401, 'Session not found');
    }

    // Перевіряємо термін дії accessToken
    if (new Date() > session.accessTokenValidUntil) {
      throw createHttpError(401, 'Access token expired');
    }

    // Знаходимо користувача за ID із JWT
    const user = await UserCollection.findById(decoded.id);
    if (!user) {
      throw createHttpError(401, 'User not found');
    }

    // Додаємо користувача до req.user для подальшого використання
    req.user = user;
    next();
  } catch (error) {
    next(error); // Передаємо помилку до глобального обробника помилок
  }
};

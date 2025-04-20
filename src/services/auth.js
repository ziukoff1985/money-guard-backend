import createHttpError from "http-errors";
import bcrypt from 'bcrypt';
import {randomBytes} from 'crypto';

import { UsersCollection } from "../db/models/user.js";
import {SessionsCollection} from '../db/models/session.js';
import {FIFTEEN_MINUTES, THIRTY_DAYS} from '../constants/index.js';

export const registerUser = async (payload) => {
  const user = await UsersCollection.findOne({email: payload.email});  
  if (user) throw createHttpError(409, 'Email already in use');

  const encryptedPassword = await bcrypt.hash(payload.password, 10);

  return await UsersCollection.create({
    ...payload,
    password: encryptedPassword
  });
};

const createSession = (userId) => {
    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');

    return SessionsCollection.create({
        userId,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAYS)
    });
};

export const loginUser = async (payload) => {
  const user = await UsersCollection.findOne({email: payload.email});
  if (!user) throw createHttpError(401, 'User not found');
  
  const isEqual = await bcrypt.compare(payload.password, user.password);
  if (!isEqual) throw createHttpError(401, 'Unauthorized');

  await SessionsCollection.deleteMany({userId: user._id});


  return await createSession(user._id);
};

export const refreshUsersSession = async ({sessionId, refreshToken}) => {
    const session = await SessionsCollection.findOne({_id: sessionId, refreshToken});
    if (!session) throw createHttpError(401, 'Session not found');

    const isSessionExpired = new Date() > new Date(session.refreshTokenValidUntil);
    if (isSessionExpired) throw createHttpError(401, 'Session token expired');

    await SessionsCollection.deleteOne({_id: sessionId, refreshToken});

    return await createSession(session.userId);
};

export const logoutUser = async (sessionId) => {
  await SessionsCollection.deleteOne({_id: sessionId});  
};
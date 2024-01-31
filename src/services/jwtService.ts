import jwt from 'jsonwebtoken';

export const jwtService = {
  signToken(payload: string | object | Buffer, expiration: string) {
    const jwtSecret= process.env.JWT_SECRET || "secret";

    return jwt.sign(payload, jwtSecret, {
      expiresIn: expiration
    });
  }
};
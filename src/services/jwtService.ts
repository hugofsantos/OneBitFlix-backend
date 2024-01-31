import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET || "secret";

export const jwtService = {
  signToken(payload: string | object | Buffer, expiration: string) {

    return jwt.sign(payload, jwtSecret, {
      expiresIn: expiration
    });
  },
  verifyToken(token: string) {
    try {
      return jwt.verify(token, jwtSecret);
    } catch (error) {
      throw error;
    }
  }
};
import { NextFunction, Request, Response } from "express";
import { jwtService } from "../services/jwtService";
import { JwtPayload } from "jsonwebtoken";
import { userService } from "../services/userService";
import { UserInstance } from "../models/User";

export interface AuthenticatedRequest extends Request {
  user?: UserInstance | null; 
}

export function ensureJwtAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authorizationHeader = req.headers.authorization;

  if(!authorizationHeader) 
    return res.status(401).json({message: "Não autorizado: Nenhum token foi encontrado."});

  const token = authorizationHeader?.replace(/Bearer /, '') ?? "";
  
  try {
    const decodedToken = jwtService.verifyToken(token);

    userService.findByEmail((decodedToken as JwtPayload).email)
      .then(user => {
        req.user = user;
      })
      .finally(() => {
        next();
      });    
  } catch (error) {
    return res.status(401).json({ message: "Não autorizado: Token inválido!" });
  }    
}

export function ensureJwtAuthViaQuery(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) {
  const {token} = req.query;

  if(typeof token !== 'string')
    return res.status(401).json({message: "O token deve ser do tipo string."});

  try {
    const decodedToken = jwtService.verifyToken(token);

    userService.findByEmail((decodedToken as JwtPayload).email)
      .then(user => {
        req.user = user;
      })
      .finally(() => {
        next();
      });
  } catch (error) {
    return res.status(401).json({ message: "Não autorizado: Token inválido!" });
  }    
}
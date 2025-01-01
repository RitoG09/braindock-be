import jwt, { JwtPayload } from "jsonwebtoken";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types";
import dotenv from "dotenv";

dotenv.config();

async function auth(
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const token = req.headers.token;

    if (!token || Array.isArray(token)) {
      res.status(400).json({
        success: false,
        message: "Token is  missing or invalid",
      });
      return;
    }

    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) return;

    const jwtPayload = jwt.verify(token, JWT_SECRET as string) as JwtPayload;
    console.log(jwtPayload);

    if (jwtPayload) {
      req.userId = jwtPayload.id;
      next();
    } else {
      res.status(403).json({
        message: "Invalid Token",
      });
    }
  } catch (error) {
    res.json({
      message: "Error occurs during Token verification",
      error: error,
    });
  }
}

export default auth;

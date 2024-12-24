// import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { error } from "console";
// import dotenv from "dotenv";
// dotenv.config();

const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstname, lastname, username, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { username } });
    if (existingUser) {
      res.status(400).json({ error: "User already exist. " });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // ekta te password arekta argument salt number

    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        username,
        email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!);
    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User failed to signup.",
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      res.status(400).json({
        error: "Invalid username or password",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user!.password);

    if (!isPasswordValid) {
      res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: user!.id }, process.env.JWT_SECRET!);
    res.status(200).json({
      message: "User logged in successfully.",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "User failed to signin.",
      error: error,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    res.status(400).json({
      message: "User logged out successfully.",
    });
  } catch (error) {
    res.status(500).json({
      message: "Unable to logout.",
      error: error,
    });
  }
};

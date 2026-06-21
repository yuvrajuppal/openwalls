import { prisma } from "../config/dbconfig.js";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import {productionmode} from '../config/dbconfig.js'
export const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    const existingEmail = await prisma.users.findUnique({ where: { email } });
    if (existingEmail) {
      return res.status(409).json({ error: "Email is already registered." });
    }

    const existingUsername = await prisma.users.findUnique({ where: { username } });
    if (existingUsername) {
      return res.status(409).json({ error: "Username is already taken." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const uiid = uuidv4();

    const user = await prisma.users.create({
      data: { uiid, username, email, password: hashedPassword },
    });

    const token = jwt.sign(
      { uiid: user.uiid, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("openwalls_userlogin_token", token, {
      httpOnly: true,
      secure: productionmode,
      sameSite: productionmode ? "None" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      token,
      user: { uiid: user.uiid, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error.", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await prisma.users.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign(
      { uiid: user.uiid, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("openwalls_userlogin_token", token, {
      httpOnly: true,
      secure: productionmode,
      sameSite: productionmode ? "None" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      token,
      user: { uiid: user.uiid, username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};


export const logout = async (req, res) => {
  res.clearCookie("openwalls_userlogin_token", {
    httpOnly: true,
    secure: productionmode,
    sameSite: productionmode ? "None" : "lax",
  });

  res.json({ message: "Logged out successfully." });
};

export const checkislogin = async (req, res) => {
  try {
    const token = req.cookies?.openwalls_userlogin_token;
    if (!token) {
      return res.status(401).json({ islogin: false, error: "No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.users.findUnique({ where: { uiid: decoded.uiid } });

    if (!user) {
      return res.status(401).json({ islogin: false, error: "User not found." });
    }

    res.json({
      islogin: true,
      user: { uiid: user.uiid, username: user.username, email: user.email },
    });
  } catch {
    res.status(401).json({ islogin: false, error: "Invalid or expired token." });
  }
};
import jwt from "jsonwebtoken";
import { prisma } from "../config/dbconfig.js";

export const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.openwalls_userlogin_token;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.users.findUnique({ where: { uiid: decoded.uiid } });

    if (!user) {
      return res.status(401).json({ error: "Unauthorized." });
    }

    req.user = { uiid: user.uiid, username: user.username, email: user.email };
    next();
  } catch {
    return res.status(401).json({ error: "Unauthorized." });
  }
};

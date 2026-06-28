// src/server.js
import "dotenv/config";

// src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// src/routes/user.routes.js
import { Router } from "express";

// src/config/dbconfig.js
import { PrismaClient } from "#prisma";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
var prisma = new PrismaClient({
  adapter: new PrismaMariaDb(process.env.DATABASE_URL)
});
var productionmode = true;

// src/controller/user.controller.js
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
var signup = async (req, res) => {
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
      data: { uiid, username, email, password: hashedPassword }
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
      maxAge: 7 * 24 * 60 * 60 * 1e3
    });
    res.status(201).json({
      token,
      user: { uiid: user.uiid, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error.", error: error.message });
  }
};
var login = async (req, res) => {
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
      maxAge: 7 * 24 * 60 * 60 * 1e3
    });
    res.json({
      token,
      user: { uiid: user.uiid, username: user.username, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
var logout = async (req, res) => {
  res.clearCookie("openwalls_userlogin_token", {
    httpOnly: true,
    secure: productionmode,
    sameSite: productionmode ? "None" : "lax"
  });
  res.json({ message: "Logged out successfully." });
};
var checkislogin = async (req, res) => {
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
      user: { uiid: user.uiid, username: user.username, email: user.email }
    });
  } catch {
    res.status(401).json({ islogin: false, error: "Invalid or expired token." });
  }
};

// src/routes/user.routes.js
var router = Router();
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/checkislogin", checkislogin);
var user_routes_default = router;

// src/routes/wallpapers.routes.js
import { Router as Router2 } from "express";

// src/controller/wallpapers.controller.js
var getallcategories = async (req, res) => {
  try {
    const categories = await prisma.wallpapers.groupBy({
      by: ["category"],
      _count: { category: true },
      orderBy: { _count: { category: "desc" } }
    });
    const result = categories.map((c) => ({
      name: c.category,
      count: c._count.category
    }));
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
var randomwallpapers = async (req, res) => {
  try {
    const wallpapers = await prisma.$queryRawUnsafe(
      "SELECT * FROM wallpapers ORDER BY RAND() LIMIT 24"
    );
    res.json(wallpapers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
var getAll = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 24;
    const skip = (page - 1) * limit;
    const [wallpapers, total] = await Promise.all([
      prisma.wallpapers.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.wallpapers.count()
    ]);
    res.json({ wallpapers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
var getById = async (req, res) => {
  try {
    const { id } = req.params;
    const wallpaper = await prisma.wallpapers.findUnique({ where: { id } });
    if (!wallpaper) {
      return res.status(404).json({ error: "Wallpaper not found." });
    }
    res.json(wallpaper);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
var getseachresut = async (req, res) => {
  try {
    const { q, page: pageQuery } = req.query;
    const page = Math.max(1, parseInt(pageQuery) || 1);
    const limit = 24;
    const skip = (page - 1) * limit;
    if (!q || !q.trim()) {
      return res.status(400).json({ error: "Query parameter 'q' is required." });
    }
    const where = {
      OR: [
        { id: { contains: q.trim() } },
        { category: { contains: q.trim() } },
        { resolution: { contains: q.trim() } }
      ]
    };
    const [wallpapers, total] = await Promise.all([
      prisma.wallpapers.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.wallpapers.count({ where })
    ]);
    res.json({ wallpapers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

// src/controller/wallpaperLikes.controller.js
var wallpaperlike = async (req, res) => {
  try {
    const { id } = req.params;
    const { uiid } = req.user;
    const existing = await prisma.wallpaperslikes.findUnique({
      where: { useruid_wallpaper: { useruid: uiid, wallpaper: id } }
    });
    if (existing) {
      return res.status(409).json({ error: "Already liked." });
    }
    await prisma.$transaction([
      prisma.wallpaperslikes.create({
        data: { useruid: uiid, wallpaper: id }
      }),
      prisma.wallpapers.update({
        where: { id },
        data: { likecount: { increment: 1 } }
      })
    ]);
    res.json({ message: "Liked." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error.", message: error.message });
  }
};
var wallpaperunlike = async (req, res) => {
  try {
    const { id } = req.params;
    const { uiid } = req.user;
    const existing = await prisma.wallpaperslikes.findUnique({
      where: { useruid_wallpaper: { useruid: uiid, wallpaper: id } }
    });
    if (!existing) {
      return res.status(404).json({ error: "Like not found." });
    }
    await prisma.$transaction([
      prisma.wallpaperslikes.delete({
        where: { id: existing.id }
      }),
      prisma.wallpapers.update({
        where: { id },
        data: { likecount: { decrement: 1 } }
      })
    ]);
    res.json({ message: "Unliked." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
var checkuserlikedthewallpaperid = async (req, res) => {
  try {
    const { id } = req.params;
    const { uiid } = req.user;
    const existing = await prisma.wallpaperslikes.findUnique({
      where: { useruid_wallpaper: { useruid: uiid, wallpaper: id } }
    });
    res.json({ liked: !!existing });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
var getmyalllikedwallpapers = async (req, res) => {
  try {
    const { uiid } = req.user;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 24;
    const skip = (page - 1) * limit;
    const [likes, total] = await Promise.all([
      prisma.wallpaperslikes.findMany({
        where: { useruid: uiid },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" }
      }),
      prisma.wallpaperslikes.count({ where: { useruid: uiid } })
    ]);
    const wallpaperIds = likes.map((l) => l.wallpaper);
    const wallpapers = await prisma.wallpapers.findMany({
      where: { id: { in: wallpaperIds } }
    });
    res.json({ wallpapers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

// src/middleware/user.middleware.js
import jwt2 from "jsonwebtoken";
var authenticate = async (req, res, next) => {
  try {
    const token = req.cookies?.openwalls_userlogin_token || req.headers.authorization?.replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({ error: "Unauthorized." });
    }
    const decoded = jwt2.verify(token, process.env.JWT_SECRET);
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

// src/routes/wallpapers.routes.js
var router2 = Router2();
router2.get("/", getAll);
router2.get("/categories", getallcategories);
router2.get("/random", randomwallpapers);
router2.get("/search", getseachresut);
router2.post("/:id/like", authenticate, wallpaperlike);
router2.post("/:id/unlike", authenticate, wallpaperunlike);
router2.get("/my-likes", authenticate, getmyalllikedwallpapers);
router2.get("/:id/checklike", authenticate, checkuserlikedthewallpaperid);
router2.get("/:id", getById);
var wallpapers_routes_default = router2;

// src/app.js
import swaggerUi from "swagger-ui-express";
import fs from "fs";
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors(
    {
      origin: (origin, callback) => {
        if (!origin) {
          return callback(null, true);
        }
        return callback(null, origin);
      },
      credentials: true
    }
  )
);
app.use("/userRoutes", user_routes_default);
app.use("/api/wallpapers", wallpapers_routes_default);
var swaggerData = JSON.parse(fs.readFileSync("./swagger-output.json", "utf-8"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerData));
var app_default = app;

// src/server.js
app_default.get("/", (req, res) => {
  res.send("server Started");
});
var ServerPort = process.env.SERVERPORT;
app_default.listen(ServerPort, () => {
  console.log(`server started at ${ServerPort}`);
});

import { prisma } from "../config/dbconfig.js";

export const getallcategories = async (req, res) => {
  try {
    const categories = await prisma.wallpapers.groupBy({
      by: ["category"],
      _count: { category: true },
      orderBy: { _count: { category: "desc" } },
    });

    const result = categories.map((c) => ({
      name: c.category,
      count: c._count.category,
    }));

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const randomwallpapers = async (req, res) => {
  try {
    const wallpapers = await prisma.$queryRawUnsafe(
      "SELECT * FROM wallpapers ORDER BY RAND() LIMIT 24"
    );

    res.json(wallpapers);
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getAll = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 24;
    const skip = (page - 1) * limit;

    const [wallpapers, total] = await Promise.all([
      prisma.wallpapers.findMany({ skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.wallpapers.count(),
    ]);

    res.json({ wallpapers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getById = async (req, res) => {
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

export const getseachresut = async (req, res) => {
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
        { resolution: { contains: q.trim() } },
      ],
    };

    const [wallpapers, total] = await Promise.all([
      prisma.wallpapers.findMany({ where, skip, take: limit, orderBy: { createdAt: "desc" } }),
      prisma.wallpapers.count({ where }),
    ]);

    res.json({ wallpapers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};


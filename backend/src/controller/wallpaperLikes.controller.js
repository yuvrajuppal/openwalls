import { prisma } from "../config/dbconfig.js";

export const wallpaperlike = async (req, res) => {
  try {
    const { id } = req.params;
    const { uiid } = req.user;

    const existing = await prisma.wallpaperslikes.findUnique({
      where: { useruid_wallpaper: { useruid: uiid, wallpaper: id } },
    });

    if (existing) {
      return res.status(409).json({ error: "Already liked." });
    }

    await prisma.$transaction([
      prisma.wallpaperslikes.create({
        data: { useruid: uiid, wallpaper: id },
      }),
      prisma.wallpapers.update({
        where: { id },
        data: { likecount: { increment: 1 } },
      }),
    ]);

    res.json({ message: "Liked." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error.",message:error.message });
  }
};

export const wallpaperunlike = async (req, res) => {
  try {
    const { id } = req.params;
    const { uiid } = req.user;

    const existing = await prisma.wallpaperslikes.findUnique({
      where: { useruid_wallpaper: { useruid: uiid, wallpaper: id } },
    });

    if (!existing) {
      return res.status(404).json({ error: "Like not found." });
    }

    await prisma.$transaction([
      prisma.wallpaperslikes.delete({
        where: { id: existing.id },
      }),
      prisma.wallpapers.update({
        where: { id },
        data: { likecount: { decrement: 1 } },
      }),
    ]);

    res.json({ message: "Unliked." });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const checkuserlikedthewallpaperid = async (req, res) => {
  try {
    const { id } = req.params;
    const { uiid } = req.user;

    const existing = await prisma.wallpaperslikes.findUnique({
      where: { useruid_wallpaper: { useruid: uiid, wallpaper: id } },
    });

    res.json({ liked: !!existing });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getmyalllikedwallpapers = async (req, res) => {
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
        orderBy: { createdAt: "desc" },
      }),
      prisma.wallpaperslikes.count({ where: { useruid: uiid } }),
    ]);

    const wallpaperIds = likes.map((l) => l.wallpaper);
    const wallpapers = await prisma.wallpapers.findMany({
      where: { id: { in: wallpaperIds } },
    });

    res.json({ wallpapers, total, page, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ error: "Internal server error." });
  }
};
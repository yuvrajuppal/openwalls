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
    res.status(500).json({ error: "Internal server error." });
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


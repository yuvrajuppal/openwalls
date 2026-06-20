import "dotenv/config";
import axios from "axios";
import { prisma } from "./src/config/dbconfig.js";

console.clear();

const totalPages = 78;
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

let page = 1;

while (page <= totalPages) {
  try {
    const { data } = await axios.get(
      `https://wallhaven.cc/api/v1/search?sorting=toplist&page=${page}`
    );

    console.log(`Page ${page}/${totalPages} — ${data.data.length} wallpapers`);

    for (const item of data.data) {
      const { id, category, file_size, path, file_type, resolution, thumbs, dimension_x, dimension_y } = item;

      await prisma.wallpapers.upsert({
        where: { id },
        update: {
          category,
          file_size: String(file_size),
          imagelink: path,
          file_type,
          resolution,
          thumbs: thumbs.original,
          dimension_x,
          dimension_y,
        },
        create: {
          id,
          category,
          file_size: String(file_size),
          imagelink: path,
          file_type,
          resolution,
          thumbs: thumbs.original,
          dimension_x,
          dimension_y,
        },
      });
    }

    page++;
    await delay(600);
  } catch (error) {
    if (error.response?.status === 429) {
      const retryAfter = parseInt(error.response.headers["retry-after"] || "10") * 1000;
      console.log(`Rate limited — waiting ${retryAfter / 1000}s...`);
      await delay(retryAfter + 1000);
    } else {
      console.error(`Error on page ${page}:`, error.message);
      await delay(5000);
    }
  }
}

console.log("All pages synced.");

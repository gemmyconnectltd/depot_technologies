import "dotenv/config";
import { PrismaClient } from "@/prisma/generated/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join } from "path";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function download(url: string, filepath: string): Promise<boolean> {
  if (existsSync(filepath)) return true;
  try {
    const res = await fetch(url);
    if (!res.ok || !res.body) return false;
    const chunks: Buffer[] = [];
    const reader = res.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(Buffer.from(value));
    }
    writeFileSync(filepath, Buffer.concat(chunks));
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const dir = join(process.cwd(), "public/images/products");
  mkdirSync(dir, { recursive: true });

  const products = await prisma.product.findMany({
    include: { images: { take: 1 } },
  });

  let ok = 0;
  let fail = 0;

  for (const product of products) {
    const img = product.images[0];
    if (!img) continue;
    const ext = img.url.includes("svg") ? "svg" : "jpg";
    const filename = `${product.slug}.${ext}`;
    const filepath = join(dir, filename);

    const success = await download(img.url, filepath);
    if (success) {
      console.log(`✓ ${filename}`);
      ok++;
    } else {
      console.log(`✗ ${filename}`);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} downloaded, ${fail} failed`);
  await prisma.$disconnect();
}

main();

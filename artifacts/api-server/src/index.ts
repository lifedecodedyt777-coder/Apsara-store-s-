import app from "./app";
import { logger } from "./lib/logger";
import { db, categoriesTable } from "@workspace/db";
import { sql } from "drizzle-orm";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

async function seed() {
  try {
    const [{ count }] = await db
      .select({ count: sql<number>`count(*)` })
      .from(categoriesTable);

    if (Number(count) === 0) {
      logger.info("Seeding initial categories...");
      const defaultCategories = [
        { name: "Skincare", slug: "skincare", sortOrder: 1 },
        { name: "Haircare", slug: "haircare", sortOrder: 2 },
        { name: "Makeup", slug: "makeup", sortOrder: 3 },
        { name: "Fragrance", slug: "fragrance", sortOrder: 4 },
        { name: "Personal Care", slug: "personal-care", sortOrder: 5 },
        { name: "Grooming", slug: "grooming", sortOrder: 6 },
        { name: "Beauty Tools", slug: "beauty-tools", sortOrder: 7 },
        { name: "Gifts & Combos", slug: "gifts-combos", sortOrder: 8 },
      ];
      await db.insert(categoriesTable).values(defaultCategories);
      logger.info("Seeding complete.");
    }
  } catch (err) {
    logger.error({ err }, "Error during seeding");
  }
}

app.listen(port, async (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
  await seed();
});

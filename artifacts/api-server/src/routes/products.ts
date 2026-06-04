import { Router, type IRouter, type Request, type Response } from "express";
import { eq, and, asc, desc } from "drizzle-orm";
import { db, productsTable, type Product } from "@workspace/db";
import {
  CreateProductBody,
  UpdateProductBody,
  GetProductParams,
  UpdateProductParams,
  DeleteProductParams,
  GetProductsQueryParams,
} from "@workspace/api-zod";
import { adminAuth } from "../middleware/adminAuth";
import { verifyToken } from "../lib/auth";

const router: IRouter = Router();

function serializeProduct(p: Product) {
  return {
    ...p,
    createdAt: p.createdAt.toISOString(),
    updatedAt: p.updatedAt.toISOString(),
  };
}

router.get("/", async (req: Request, res: Response): Promise<void> => {
  const query = GetProductsQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: query.error.message });
    return;
  }

  const { categoryId, featured, visible } = query.data;

  const authHeader = req.headers.authorization;
  const isAdmin = authHeader?.startsWith("Bearer ") && verifyToken(authHeader.slice(7));

  const conditions = [];

  if (categoryId !== undefined) {
    conditions.push(eq(productsTable.categoryId, categoryId));
  }

  if (featured !== undefined) {
    conditions.push(eq(productsTable.featured, featured));
  }

  if (visible === "all" && isAdmin) {
    // Show all — no visibility filter
  } else {
    conditions.push(eq(productsTable.visible, true));
  }

  const products = await db
    .select()
    .from(productsTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(productsTable.sortOrder), desc(productsTable.createdAt));

  res.json(products.map(serializeProduct));
});

router.post("/", adminAuth, async (req: Request, res: Response): Promise<void> => {
  const parsed = CreateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [product] = await db
    .insert(productsTable)
    .values(parsed.data)
    .returning();

  res.status(201).json(serializeProduct(product));
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const params = GetProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .select()
    .from(productsTable)
    .where(eq(productsTable.id, params.data.id));

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(serializeProduct(product));
});

router.patch("/:id", adminAuth, async (req: Request, res: Response): Promise<void> => {
  const params = UpdateProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const parsed = UpdateProductBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [product] = await db
    .update(productsTable)
    .set({ ...parsed.data, updatedAt: new Date() })
    .where(eq(productsTable.id, params.data.id))
    .returning();

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.json(serializeProduct(product));
});

router.delete("/:id", adminAuth, async (req: Request, res: Response): Promise<void> => {
  const params = DeleteProductParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [product] = await db
    .delete(productsTable)
    .where(eq(productsTable.id, params.data.id))
    .returning();

  if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }

  res.sendStatus(204);
});

export default router;

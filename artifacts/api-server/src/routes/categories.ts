import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { eq, asc } from "drizzle-orm";
import { db, categoriesTable, type Category } from "@workspace/db";
import {
  CreateCategoryBody,
  UpdateCategoryBody,
  GetCategoryParams,
  UpdateCategoryParams,
  DeleteCategoryParams,
} from "@workspace/api-zod";
import { adminAuth } from "../middleware/adminAuth";

const router: IRouter = Router();

function serializeCategory(c: Category) {
  return {
    ...c,
    createdAt: c.createdAt.toISOString(),
    updatedAt: c.updatedAt.toISOString(),
  };
}

router.get("/", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const categories = await db
      .select()
      .from(categoriesTable)
      .orderBy(asc(categoriesTable.sortOrder));
    res.json(categories.map(serializeCategory));
  } catch (err) {
    next(err);
  }
});

router.post("/", adminAuth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = CreateCategoryBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    const [category] = await db
      .insert(categoriesTable)
      .values(parsed.data)
      .returning();

    res.status(201).json(serializeCategory(category));
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const params = GetCategoryParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    const [category] = await db
      .select()
      .from(categoriesTable)
      .where(eq(categoriesTable.id, params.data.id));

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(serializeCategory(category));
  } catch (err) {
    next(err);
  }
});

router.patch("/:id", adminAuth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const params = UpdateCategoryParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    const parsed = UpdateCategoryBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    const [category] = await db
      .update(categoriesTable)
      .set({ ...parsed.data, updatedAt: new Date() })
      .where(eq(categoriesTable.id, params.data.id))
      .returning();

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.json(serializeCategory(category));
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", adminAuth, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const params = DeleteCategoryParams.safeParse(req.params);
    if (!params.success) {
      res.status(400).json({ error: params.error.message });
      return;
    }

    const [category] = await db
      .delete(categoriesTable)
      .where(eq(categoriesTable.id, params.data.id))
      .returning();

    if (!category) {
      res.status(404).json({ error: "Category not found" });
      return;
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

export default router;

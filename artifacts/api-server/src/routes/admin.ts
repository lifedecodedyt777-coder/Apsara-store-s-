import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { AdminLoginBody, AdminLoginResponse } from "@workspace/api-zod";
import { validateAdminPassword, generateToken } from "../lib/auth";

const router: IRouter = Router();

router.post("/login", async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const parsed = AdminLoginBody.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.message });
      return;
    }

    if (!validateAdminPassword(parsed.data.password)) {
      res.status(401).json({ error: "Invalid password" });
      return;
    }

    const token = generateToken();
    res.json(AdminLoginResponse.parse({ token }));
  } catch (err) {
    next(err);
  }
});

export default router;

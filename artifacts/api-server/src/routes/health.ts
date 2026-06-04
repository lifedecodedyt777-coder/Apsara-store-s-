import { Router, type IRouter, type Request, type Response, type NextFunction } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/healthz", (_req: Request, res: Response, next: NextFunction): void => {
  try {
    const data = HealthCheckResponse.parse({ status: "ok" });
    res.json(data);
  } catch (err) {
    next(err);
  }
});

export default router;

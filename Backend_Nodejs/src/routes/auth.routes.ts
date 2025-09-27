import { Router } from "express";
import { authAccessGuard, authRefreshGuard } from "src/middleware/authGuard";
import { validate } from "src/middleware/validate";
import { authController } from "src/modules/auth/auth.controller";
import { authSchema } from "src/modules/auth/auth.schema";

const r = Router();

r.post(
  "/sign_up",
  validate({ body: authSchema.signup }),
  authController.signup
);

r.post(
  "/sign_in",
  validate({ body: authSchema.signin }),
  authController.signin
);

r.post(
  "/sign_up/admin",
  validate({ body: authSchema.signup }),
  authController.signupAdmin
);

r.post(
  "/sign_in/admin",
  validate({ body: authSchema.signin }),
  authController.signinAdmin
);

r.delete("/sign_out", authAccessGuard, authController.signout);
r.get("/refresh", authRefreshGuard, authController.refreshToken);
export default r;

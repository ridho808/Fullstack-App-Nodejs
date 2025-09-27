import { Router } from "express";
import { authAccessGuard, authRoleGuard } from "src/middleware/authGuard";
import { userController } from "src/modules/users/user.controller";

const r = Router();

r.use(authAccessGuard);
r.get("/", userController.AllUsers);
r.get("/:id", userController.FindUserById);
r.patch("/:id", userController.UpdateUserById);
r.delete("/:id", authRoleGuard, userController.DeleteUserById);

export default r;

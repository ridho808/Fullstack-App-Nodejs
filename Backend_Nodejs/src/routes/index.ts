import { Router } from "express";
import authRoutes from "./auth.routes";
import employeesRoutes from "./employees.routes";
import userRoutes from "./users.routes";

const r = Router();

r.use("/auth", authRoutes);
r.use("/employees", employeesRoutes);
r.use("/users", userRoutes);

export default r;

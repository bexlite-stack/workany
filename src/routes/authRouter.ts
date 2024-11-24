import { Elysia } from "elysia";
import { authController } from "../controllers/authController";

export const authRouter = new Elysia()
  // Interface
  .get("/register", authController.renderRegisterUI)
  .get("/login", authController.renderLoginUI)

  // Controller
  .post("/register", authController.handleRegisterUser)
  .post("/login", authController.handleLoginUser)
  .post("/login/google", authController.handleLoginWithGoogle)
  .get("/login/google/callback", authController.handleLoginWithGoogleCallback)
  .post("/logout", authController.handleLogoutUser);

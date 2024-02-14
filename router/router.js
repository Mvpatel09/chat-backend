import { Router } from "express";
const route = Router();
import * as user from "../controller/userController.js";
import Auth from "../middleware/auth.js";
import { Validate } from "../validation/validate.js";

route.post("/sign-up", Validate("SignUp"), user.SignUp);
route.post("/login", Validate("LogIn"), user.Login);
route.get("/get-users", Auth, user.getAllUser);

export default route;
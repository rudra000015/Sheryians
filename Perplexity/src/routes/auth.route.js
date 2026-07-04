import { Router } from "express";
import { loginValidator, registerValidator } from "../validators/auth.validator.js";
import { getMe, login, register, verifyemail } from "../controllers/auth.controller.js";
import { authuser } from "../middlewares/auth.middleware.js";
const authRouter = Router();





/**
 * @route POST api/auth/register
 * @description Register a User
 * @access Public
 * @body {username , email , password}
 */
authRouter.post('/register', registerValidator, register);


/**
* @route POST /api/auth/login
* @desc Login user and return JWT token
* @access Public
* @body { email, password }
*/

authRouter.post("/login",loginValidator,login)


/**
 * @route GET api/auth/getMe
 * @description Fetch user details
 * @access Private
 */
authRouter.get("/getMe",authuser,getMe)
/**
 * @route GET api/auth/verify-email
 * @description Verify a User Through Email
 * @access Public
 * @body { token }
 */
authRouter.get('/verify-email', verifyemail);

export default authRouter;
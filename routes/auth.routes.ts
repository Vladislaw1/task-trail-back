import {Router} from "express";
import {login, register, protectedRoute, getAllUsers} from "../controllers/auth.controller";
import {authMiddlaware} from "../middlewares/auth.middleware";

const router = Router()

router.post('/register', register);
router.post('/login', login);
router.post('/protected', authMiddlaware,protectedRoute);
router.get('/get-users', authMiddlaware,getAllUsers);

export default router;
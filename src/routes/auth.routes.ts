import { Router } from "express";
import { auth } from "../controller/auth.controller";


const router = Router();
const authController = new auth();


router.post('/',authController.crearSession)


export default router;
import { Router } from "express";
import { LoginController } from "../controller/login.controller";


const router = Router();
const loginCont = new LoginController();



router.post('/',loginCont.login)


export default router;
import express from 'express';
const router = express.Router();
import userController from '../service/user/userController';
import auth from '../middleware/auth'

router.post("/create", (req, res) => userController.create(req, res));
router.post("/login", (req, res) => userController.login(req, res));
router.patch("/update/:id", auth, (req, res) => userController.update(req, res));
router.delete("delete/:id", auth, (req, res) => userController.deleteUsers(req, res));



export default router;
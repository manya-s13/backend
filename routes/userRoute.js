import express from "express";
import { createUser, deleteUser, getUser, getUsers, loginUser, myProfile, updateUser } from "../userControllers/userController.js";
import { authMiddleware } from "../middleware/auth.js";

export const router = express.Router();

router.post("/user", createUser)

router.get("/users", getUsers)

router.get("/get/user/:id", getUser)

router.put("/update/:id", updateUser)

router.delete("/del/:id", deleteUser)

router.post("/user/login", loginUser)

router.get("/my/profile", authMiddleware, myProfile)
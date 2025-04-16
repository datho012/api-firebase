// User routes for API endpoints
import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

// GET all users
router.get("/", async (req, res) => {
  await userController.getAllUsers(req, res);
});

// GET a single user by ID
router.get("/:id", async (req, res) => {
  await userController.getUserById(req, res);
});

// POST create a new user
router.post("/", async (req, res) => {
  await userController.createUser(req, res);
});

// PUT update a user
router.put("/:id", async (req, res) => {
  await userController.updateUser(req, res);
});

// DELETE a user
router.delete("/:id", async (req, res) => {
  await userController.deleteUser(req, res);
});

export default router;

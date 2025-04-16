// User controller for API routes
import { db } from "../config/firebase.js";
import { validateUser } from "../models/user.model.js";

export const userController = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const usersSnapshot = await db.collection("users").get();
      const users = [];
      usersSnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Failed to fetch users" });
    }
  },

  // Get user by ID
  async getUserById(req, res) {
    try {
      const userDoc = await db.collection("users").doc(req.params.id).get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ id: userDoc.id, ...userDoc.data() });
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  },

  // Create new user
  async createUser(req, res) {
    try {
      const userData = req.body;

      // Basic validation
      if (!validateUser(userData)) {
        return res.status(400).json({ error: "Invalid user data format" });
      }

      // Get max ID
      const snapshot = await db
        .collection("users")
        .orderBy("id", "desc")
        .limit(1)
        .get();

      const maxId = snapshot.empty ? 0 : snapshot.docs[0].data().id;
      userData.id = maxId + 1;

      const docRef = await db.collection("users").add(userData);
      res.status(201).json({ id: docRef.id, ...userData });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Failed to create user" });
    }
  },

  // Update user
  async updateUser(req, res) {
    try {
      const userDoc = await db.collection("users").doc(req.params.id).get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }

      await db.collection("users").doc(req.params.id).update(req.body);
      res.json({ message: "User updated successfully" });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Failed to update user" });
    }
  },

  // Delete user
  async deleteUser(req, res) {
    try {
      const userDoc = await db.collection("users").doc(req.params.id).get();
      if (!userDoc.exists) {
        return res.status(404).json({ error: "User not found" });
      }

      await db.collection("users").doc(req.params.id).delete();
      res.json({ message: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Failed to delete user" });
    }
  },
};

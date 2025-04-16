// Script to seed users to Firebase
import { db } from "../config/firebase.js";
import { validateUser } from "../models/user.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Get the current file name and directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function seedUsers() {
  try {
    console.log("Starting the seeding process...");
    console.log("Firebase DB instance:", db ? "Connected" : "Not connected");

    // Check if users collection already has data
    console.log("Checking for existing users...");
    const existingUsers = await db.collection("users").limit(1).get();
    if (!existingUsers.empty) {
      console.log(
        "Users collection already has data. Clearing before seeding..."
      );
      // Delete existing users if needed
      const batchDelete = db.batch();
      const snapshot = await db.collection("users").get();
      snapshot.docs.forEach((doc) => {
        batchDelete.delete(doc.ref);
      });
      await batchDelete.commit();
      console.log("Existing users deleted.");
    } else {
      console.log("No existing users found.");
    }

    console.log("Creating 20 user records...");
    const users = Array(20)
      .fill(null)
      .map((_, index) => ({
        id: index + 1,
        name: `User ${index + 1}`,
        username: `user${index + 1}`,
        email: `user${index + 1}@example.com`,
        phone: `+1-555-${String(Math.floor(1000 + Math.random() * 9000))}`,
        website: `user${index + 1}.website.com`,
        address: {
          street: `${Math.floor(Math.random() * 1000)} Main Street`,
          suite: `Suite ${Math.floor(Math.random() * 100)}`,
          city: ["New York", "Los Angeles", "Chicago", "Houston"][
            Math.floor(Math.random() * 4)
          ],
          zipcode: String(Math.floor(10000 + Math.random() * 90000)),
          geo: {
            lat: String((Math.random() * 180 - 90).toFixed(4)),
            lng: String((Math.random() * 360 - 180).toFixed(4)),
          },
        },
        company: {
          name: `Company ${index + 1}`,
          catchPhrase: `Innovative business solution ${index + 1}`,
          bs: `Business strategy ${index + 1}`,
        },
      }));

    // Validate each user against the model
    console.log("Validating user data against model...");
    const invalidUsers = users.filter((user) => !validateUser(user));
    if (invalidUsers.length > 0) {
      console.error(
        "Some users do not match the required model:",
        invalidUsers
      );
      throw new Error("Invalid user data detected");
    }
    console.log("All users valid.");

    console.log("Preparing batch operation...");
    const batch = db.batch();

    users.forEach((user) => {
      // Use user ID as document ID for easier retrieval
      const docRef = db.collection("users").doc(String(user.id));
      batch.set(docRef, user);
    });

    console.log("Committing batch to Firestore...");
    await batch.commit();
    console.log("Successfully added 20 users!");
    return users;
  } catch (error) {
    console.error("Error in seedUsers function:", error);
    throw error;
  }
}

// Check if this script is being run directly
const isMainScript = process.argv[1] === fileURLToPath(import.meta.url);

if (isMainScript) {
  console.log("Script started directly");
  seedUsers()
    .then(() => {
      console.log("Seeding completed successfully");
      process.exit(0);
    })
    .catch((error) => {
      console.error("Seeding failed:", error);
      process.exit(1);
    });
} else {
  console.log("Script imported as module");
}

export default seedUsers;

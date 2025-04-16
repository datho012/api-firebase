// Script to seed users to Firebase
import { db } from "../config/firebase.js";

async function seedUsers() {
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

  try {
    const batch = db.batch();

    users.forEach((user) => {
      const docRef = db.collection("users").doc();
      batch.set(docRef, user);
    });

    await batch.commit();
    console.log("Successfully added 20 users!");
  } catch (error) {
    console.error("Error adding users:", error);
  }
}

// For direct execution: node scripts/seedUsers.js
if (process.argv[1] === import.meta.url) {
  seedUsers().then(() => process.exit(0));
}

export default seedUsers;

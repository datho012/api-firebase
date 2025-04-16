// User model
export const UserSchema = {
  id: Number,
  name: String,
  username: String,
  email: String,
  phone: String,
  website: String,
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
    geo: {
      lat: String,
      lng: String,
    },
  },
  company: {
    name: String,
    catchPhrase: String,
    bs: String,
  },
};

// Simple validation function to replace TypeScript interface
export function validateUser(user) {
  return (
    user &&
    typeof user.id === "number" &&
    typeof user.name === "string" &&
    typeof user.username === "string" &&
    typeof user.email === "string" &&
    typeof user.phone === "string"
  );
}

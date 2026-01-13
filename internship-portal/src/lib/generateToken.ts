import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

console.log("ADMIN TOKEN:");
console.log(
  jwt.sign({ email: "admin@test.com", role: "admin" }, JWT_SECRET)
);

console.log("\nUSER TOKEN:");
console.log(
  jwt.sign({ email: "user@test.com", role: "user" }, JWT_SECRET)
);

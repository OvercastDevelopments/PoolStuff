import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

// Resets the admin user's password to "password" and clears the
// mustChangePassword flag so tests can log in with a known state.
export async function resetAdmin() {
  const prisma = new PrismaClient();
  try {
    const passwordHash = await bcrypt.hash("password", 10);
    await prisma.user.upsert({
      where: { username: "admin" },
      update: { passwordHash, mustChangePassword: false },
      create: { username: "admin", passwordHash, mustChangePassword: false },
    });
  } finally {
    await prisma.$disconnect();
  }
}

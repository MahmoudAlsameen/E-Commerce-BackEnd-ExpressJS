import bcrypt from "bcrypt";
import adminModel from "../db/models/admin.model.js";
const createDefaultAdmin = async () => {
  const adminCount = await adminModel.countDocuments();

  if (adminCount === 0) {
    const hashedPassword = bcrypt.hashSync(
      "admin",
      parseInt(process.env.SALT_ROUNDS)
    );
    await adminModel.create({
      email: "admin@admin.com",
      password: hashedPassword,
    });
    console.log(
      `there were no admins, created one!, email:"admin@admin.com", password:"admin"`
    );
  }
};

export { createDefaultAdmin };

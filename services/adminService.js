import bcrypt from "bcrypt";
const createDefaultAdmin = async () => {
  const managerCount = await adminModel.countDocuments();

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

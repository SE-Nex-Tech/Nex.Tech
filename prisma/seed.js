const { PrismaClient } = require("@prisma/client");
const { hash } = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const password = await hash("test", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@test.com" },
    update: {},
    create: {
      email: "test@test.com",
      name: "Test User",
      password,
    },
  });
  const createMany = await prisma.user.createMany({
    data: [
      { email: "edjin@edjin.com", name: "edjin", password },
      { email: "carl@carl.com", name: "carl", password },
      { email: "chy@chy.com", name: "chy", password },
      { email: "kyle@kyle.com", name: "Kyle", password },
    ],
    skipDuplicates: true,
  });
  console.log({ user });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

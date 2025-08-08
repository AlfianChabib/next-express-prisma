import prisma from "../src/app/db";

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password",
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password",
  },
];

async function main() {
  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

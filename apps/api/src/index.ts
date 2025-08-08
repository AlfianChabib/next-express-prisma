import App from "./app/app";
import prisma from "./app/db";

const main = async () => {
  await prisma.$connect();

  const app = new App();
  app.start();
};

main();

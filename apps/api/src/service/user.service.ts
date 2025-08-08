import prisma from "../app/db";

export class UserService {
  static async getUsers() {
    const users = await prisma.user.findMany();
    return users;
  }
}

import { User } from "@prisma/client";
import { prisma } from "../../modules/prisma";

export const UserRepository = {
  find(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },
  findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },
  all() {
    return prisma.user.findMany();
  },
  create(data: Omit<User, "id">) {
    return prisma.user.create({ data });
  },
};

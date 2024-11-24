import { createId } from "@paralleldrive/cuid2";
import { client } from "../models/client";
import { IUser } from "../types/entities";
import { aggregate } from "../lib/aggregate";

export const userServices = {
  createUser: async (name: string, email: string, password: string | null): Promise<IUser | null> => {
    const id = createId();
    const hashpassword = password ? await Bun.password.hash(password as string, { algorithm: "argon2d" }) : null;

    try {
      await client.execute({
        sql: "INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
        args: [id, name, email, hashpassword, "user", Date.now(), Date.now()],
      });

      return {
        id,
        name,
        email,
        password,
        role: "user",
        avatar: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    } catch (error) {
      return null;
    }
  },

  updateUser: async (id: string, name: string, email: string, password: string | null, avatar: string | null): Promise<IUser | null> => {
    try {
      await client.execute({
        sql: "UPDATE users SET name = $1, email = $2, password = $3, avatar = $4, updated_at = $4 WHERE id = $5",
        args: [name, email, password, avatar, Date.now(), id],
      });

      return {
        id,
        name,
        email,
        password,
        role: "user",
        avatar: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
    } catch (error) {
      return null;
    }
  },

  findUser: async (id: string | null, email: string | null): Promise<IUser | null> => {
    try {
      const findUser = await client.execute({
        sql: "SELECT * FROM users WHERE id = ? OR email = ?",
        args: [id, email],
      });
      const user = aggregate(findUser.toJSON()) as IUser[];
      return user[0];
    } catch (error) {
      return null;
    }
  },
};

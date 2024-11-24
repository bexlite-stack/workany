import { createId } from "@paralleldrive/cuid2";
import { client } from "../models/client";

export const imagesServices = {
  createImage: async (name: string, workplaceId: string, userId: string, type: "workplace" | "reviews") => {
    const imageId = createId();

    try {
      await client.execute({
        sql: "INSERT INTO images (id, filename, workplace_id, user_id, type, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?);",
        args: [imageId, name, workplaceId, userId, type, Date.now(), Date.now()],
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
};

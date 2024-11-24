import { createId } from "@paralleldrive/cuid2";
import { client } from "../models/client";
import { aggregate } from "../lib/aggregate";

export const reviewsServices = {
  getReviews: async (workplaceId: string) => {
    try {
      const reviewsData = await client.execute({
        sql: `
            SELECT 
                reviews.id as id,
                reviews.content as content,
                reviews.quiteness as quiteness,
                reviews.comfortness as comfortness,
                reviews.service as service,
                reviews.cleanliness as cleanliness,
                reviews.food_quality as foodQuality,
                reviews.food_price as foodPrice,
                reviews.created_at as createdAt,
                reviews.updated_at as updatedAt,
                users.name,
                users.avatar
            FROM 
                reviews 
            JOIN 
                users ON users.id = reviews.user_id
            WHERE 
                reviews.workplace_id = ?
            ORDER BY
                reviews.created_at DESC
          `,
        args: [workplaceId],
      });

      return aggregate(reviewsData.toJSON());
    } catch (error) {
      return [];
    }
  },

  getRatings: async (workplaceId: string) => {
    try {
      const ratingsData = await client.execute({
        sql: `
            SELECT 
                AVG(reviews.quiteness) as quiteness,
                AVG(reviews.comfortness) as comfortness,
                AVG(reviews.service) as service,
                AVG(reviews.cleanliness) as cleanliness,
                AVG(reviews.food_quality) as foodQuality,
                AVG(reviews.food_price) as foodPrice
            FROM 
                reviews 
            WHERE 
                reviews.workplace_id = ?
        `,
        args: [workplaceId],
      });

      return aggregate(ratingsData.toJSON())[0];
    } catch (error) {
      return null;
    }
  },

  createReview: async (
    workplaceId: string,
    userId: string,
    content: string,
    quiteness: number,
    comfortness: number,
    service: number,
    cleanliness: number,
    foodQuality: number,
    foodPrice: number
  ) => {
    const id = createId();

    try {
      await client.execute({
        sql: "INSERT INTO reviews (id, workplace_id, user_id, content, quiteness, comfortness, service, cleanliness, food_quality, food_price, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        args: [id, workplaceId, userId, content, quiteness, comfortness, service, cleanliness, foodQuality, foodPrice, Date.now(), Date.now()],
      });

      const reviewData = await client.execute({
        sql: "SELECT * FROM reviews WHERE id = ?",
        args: [id],
      });

      return aggregate(reviewData.toJSON())[0];
    } catch (error) {
      return false;
    }
  },
};

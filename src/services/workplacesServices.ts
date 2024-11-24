import { createId } from "@paralleldrive/cuid2";
import { client } from "../models/client";
import { aggregate } from "../lib/aggregate";

export const workplacesServices = {
  getWorkplaces: async ({ limit, city, type }: { limit?: number; city?: string; type?: string }) => {
    try {
      let sql = `
        SELECT 
          w.id as id,
          w.name as name,
          w.address as address,
          w.type as type,
          c.name as city, 
          w.created_at as createdAt,
          w.updated_at as updatedAt,
          u.name as username,
          '[' || GROUP_CONCAT('"' || i.filename || '"' , ', ') || ']' as images
        FROM 
          workplaces w
        JOIN 
          cities c ON w.city_id = c.id
        JOIN
          users u ON w.user_id = u.id
        LEFT JOIN 
          images i ON w.id = i.workplace_id
      `;

      let whereClauses = [];
      let args = [];

      // Always add the verified = 1 condition
      whereClauses.push("w.verified = 1");

      if (city) {
        whereClauses.push("c.name = ?");
        args.push(city);
      }

      if (type) {
        whereClauses.push("w.type = ?");
        args.push(type);
      }

      if (whereClauses.length > 0) {
        sql += " WHERE " + whereClauses.join(" AND ");
      }

      sql += `
    GROUP BY 
      w.id, w.name, w.address, w.type, c.name, w.created_at, w.updated_at, u.name
    ORDER BY 
      w.created_at DESC
    LIMIT ?;
  `;

      args.push(limit || 9);

      const workplaces = await client.execute({
        sql,
        args,
      });

      return aggregate(workplaces.toJSON());
    } catch (error) {
      return [];
    }
  },

  getSingleWorkplace: async (id: string) => {
    try {
      const workplace = await client.execute({
        sql: `
              SELECT 
                  w.id AS id,
                  w.name AS name,
                  w.address AS address,
                  w.type AS type,
                  c.name AS city, 
                  w.created_at AS createdAt,
                  w.updated_at AS updatedAt,
                  u.name AS username,
                  '[' || GROUP_CONCAT('"' || li.filename || '"' , ', ') || ']' AS images
              FROM 
                  workplaces w
              JOIN 
                  cities c ON w.city_id = c.id
              JOIN
                  users u ON w.user_id = u.id
              LEFT JOIN 
                  (SELECT 
                      i.workplace_id,
                      i.filename
                  FROM 
                      images i
                  WHERE 
                      i.id IN (SELECT id FROM images WHERE workplace_id = i.workplace_id LIMIT 5)
                  ) li ON w.id = li.workplace_id
              WHERE 
                  w.id = ?
              GROUP BY 
                  w.id, w.name, w.address, w.type, c.name, w.created_at, w.updated_at, u.name;
              ;
              `,
        args: [id],
      });
      return aggregate(workplace.toJSON())[0];
    } catch (error) {
      return null;
    }
  },

  createWorkplace: async (name: string, address: string, cityId: string, type: string, userId: string) => {
    const id = createId();

    try {
      await client.execute({
        sql: "INSERT INTO workplaces  (id, name, address, city_id, type, user_id, created_at, updated_at, verified) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
        args: [id, name, address, cityId, type, userId, Date.now(), Date.now(), 0],
      });

      const workplace = await client.execute({
        sql: "SELECT * FROM workplaces WHERE id = ?",
        args: [id],
      });

      return aggregate(workplace.toJSON())[0];
    } catch (error) {
      return null;
    }
  },
};

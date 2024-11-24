import { client } from "../models/client";

export const createTables = async () => {
  const usersSchema = await Bun.file("./src/models/schema/usersSchema.sql").text();
  const citiesSchema = await Bun.file("./src/models/schema/citiesSchema.sql").text();
  const workplaceSchema = await Bun.file("./src/models/schema/workplaceSchema.sql").text();
  const reviewsSchema = await Bun.file("./src/models/schema/reviewsSchema.sql").text();
  const imagesSchema = await Bun.file("./src/models/schema/imagesSchema.sql").text();

  const transaction = await client.transaction("write");

  try {
    await transaction.executeMultiple(usersSchema);
    await transaction.executeMultiple(citiesSchema);
    await transaction.executeMultiple(workplaceSchema);
    await transaction.executeMultiple(reviewsSchema);
    await transaction.executeMultiple(imagesSchema);

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
  }
};

import { aggregate } from "../lib/aggregate";
import { client } from "../models/client";

export const citiesServices = {
  getCities: async () => {
    try {
      const cities = await client.execute("SELECT * FROM cities");
      return aggregate(cities.toJSON());
    } catch (error) {
      return [];
    }
  },
};

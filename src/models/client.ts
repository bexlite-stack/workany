import { createClient } from "@libsql/client";

export const client = createClient({
  // url: "file:./db/embedded.db",
  url: process.env.TURSODB_URL!,
  authToken: process.env.TURSODB_TOKEN!,
  syncInterval: 1000 * 60 * 5,
});

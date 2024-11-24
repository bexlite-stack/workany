import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "../utils/awss3";

export const fileServices = {
  upload: async (key: string, folder: string, type: "workplaces" | "reviews" | "users", body: Blob) => {
    const bytes = await body.arrayBuffer();
    const buffer = Buffer.from(bytes);
    try {
      const data = await s3Client.send(
        new PutObjectCommand({
          Bucket: "workanywhere",
          Key: `${type}/${folder}/${key}`,
          ContentType: body.type,
          Body: buffer,
          ACL: "public-read",
        })
      );

      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export async function saveImages(id: string, fileImages: Blob | Blob[]) {
  const imagesArray = Array.isArray(fileImages) ? fileImages : [fileImages];
  const saveImagePromises = imagesArray.map((image) => Bun.write(`./public/assets/${id}/${image.name}`, image));
  await Promise.all(saveImagePromises);

  return imagesArray;
}

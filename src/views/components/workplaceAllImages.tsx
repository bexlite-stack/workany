import { IWorkplace } from "../../types/entities";

export const WorkplaceAllImages = ({ workplaceId, images }: { workplaceId: string; images: IWorkplace["images"] }) => {
  const allImages = JSON.parse(images);

  return (
    <main class="absolute z-20 top-0 left-0 w-full ">
      <div
        hx-delete="/workplaces/{workplaceId}/images"
        hx-swap="outerHTML transition:true"
        hx-target="closest main"
        class="min-h-screen bg-black/50 backdrop-blur-lg pt-40 cursor-pointer"
      >
        <div class="bg-white w-full p-12 lg:p-40 rounded-t-2xl h-full space-y-5">
          {allImages.map((image: string) => {
            return <img src={`${process.env.S3_URL}/workanywhere/workplaces/${workplaceId}/${image}`} class="w-full h-full object-cover rounded-xl" />;
          })}
        </div>
      </div>
    </main>
  );
};

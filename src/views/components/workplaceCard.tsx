export const WorkplaceCard = ({ id, name, city, type, images }: { id: string; name: string; city: string; type: string; images: string }) => {
  const imageCover = JSON.parse(images)[0];

  return (
    <div class="relative border hover:border-rose-500 transition duration-200 p-2 rounded-2xl">
      <a href={`/workplaces/${id}`} hx-boost="true" class="cursor-pointer">
        <div class="bg-slate-50 rounded-xl cursor-pointer h-80 overflow-hidden">
          <img src={`${process.env.S3_URL}/workanywhere/workplaces/${id}/${imageCover}`} class="w-full h-full object-cover" />{" "}
        </div>
      </a>
      <div class="p-4">
        <div class="flex justify-between items-center">
          <h3>{name}</h3>
          <div class="bg-black text-white font-medium px-2 py-1 rounded text-xs">{type}</div>
        </div>
      </div>
      <div class="absolute top-6 right-6 py-1 px-3 text-sm bg-rose-500 text-white font-medium rounded-full w-fit">{city}</div>
    </div>
  );
};

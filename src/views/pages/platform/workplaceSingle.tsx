import { TUserJWT } from "../../../types/app";
import { IWorkplace } from "../../../types/entities";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";

export const WorkplaceSingle = ({ workplace, user }: { workplace: IWorkplace; user: TUserJWT }) => {
  const images = JSON.parse(workplace.images);

  return (
    <TemplateBase>
      <Header user={user} />
      <main class="max-w-7xl m-auto p-8 space-y-8 mt-12">
        <section class="flex flex-col gap-6 lg:gap-0 lg:flex-row justify-between items-start lg:items-end">
          <section class="space-y-4">
            <h1 class="text-black">{workplace.name}</h1>
            <div class="flex gap-4 items-center">
              <div class="bg-rose-500 text-white px-4 py-1 rounded-full">{workplace.city}</div>
              <h3>{workplace.address}</h3>
            </div>
          </section>
          <div>
            <p class="text-left lg:text-right mb-2">Have you been here ?</p>
            <a href={`/workplaces/${workplace.id}/reviews/submit`}>
              <button class="w-fit">Check-in and Add review</button>
            </a>
          </div>
        </section>
        <section class="h-[300px] lg:h-[600px] relative grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden">
          {images.map((image: string) => {
            return (
              <img
                src={`${process.env.S3_URL}/workanywhere/workplaces/${workplace.id}/${image}`}
                class="first:col-span-4 lg:first:col-span-2 first:row-span-2 w-full h-full object-cover"
              />
            );
          })}
          <button
            hx-get={`/workplaces/${workplace.id}/images`}
            hx-target="body"
            hx-swap="beforeend transition:true"
            class="absolute w-fit bottom-10 right-10 bg-white text-slate-800 cursor-pointer flex gap-2 items-center font-bold px-4 py-2 rounded-full shadow-xl"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" class="mb-1">
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2.384 13.793c-.447-3.164-.67-4.745.278-5.77C3.61 7 5.298 7 8.672 7h6.656c3.374 0 5.062 0 6.01 1.024.947 1.024.724 2.605.278 5.769l-.422 3c-.35 2.48-.525 3.721-1.422 4.464-.897.743-2.22.743-4.867.743h-5.81c-2.646 0-3.97 0-4.867-.743-.897-.743-1.072-1.983-1.422-4.464z"></path>
                <path
                  d="M19.562 7a2.132 2.132 0 00-2.1-2.5H6.538a2.132 2.132 0 00-2.1 2.5M17.5 4.5c.028-.26.043-.389.043-.496a2 2 0 00-1.787-1.993C15.65 2 15.52 2 15.26 2H8.74c-.26 0-.391 0-.497.011a2 2 0 00-1.787 1.993c0 .107.014.237.043.496"
                  opacity="0.5"
                ></path>
                <circle cx="16.5" cy="11.5" r="1.5" opacity="0.5"></circle>
                <path
                  strokeLinecap="round"
                  d="M20 20l-2.884-2.149c-.93-.692-2.316-.761-3.34-.166l-.266.155c-.712.414-1.68.345-2.294-.164l-3.839-3.177c-.766-.634-1.995-.668-2.81-.078l-1.324.96"
                  opacity="0.5"
                ></path>
              </g>
            </svg>
            See all images
          </button>
        </section>
        <h2 class="text-black  pt-12">User reviews </h2>
        <section class="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div class="block lg:hidden col-span-1 lg:col-span-2 min-h-[200px] bg-slate-50 rounded-xl p-8 space-y-4">
            <h3>User ratings</h3>
            <div hx-get={`/workplaces/${workplace.id}/ratings`} hx-trigger="load" class="space-y-2"></div>
          </div>
          <div class="col-span-1 lg:col-span-4 space-y-6" hx-get={`/workplaces/${workplace.id}/reviews`} hx-trigger="load"></div>
          <div class="hidden lg:block col-span-1 lg:col-span-2 min-h-[200px] bg-slate-50 rounded-xl p-8 space-y-4">
            <h3>User ratings</h3>
            <div hx-get={`/workplaces/${workplace.id}/ratings`} hx-trigger="load" class="space-y-2"></div>
          </div>
        </section>
      </main>
    </TemplateBase>
  );
};

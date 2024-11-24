import { TUserJWT } from "../../../types/app";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";

export const WorkplaceFormInfo = ({ user, cities }: { user: TUserJWT; cities: Record<string, any>[] }) => {
  return (
    <TemplateBase>
      <Header user={user} />
      <main class="max-w-5xl m-auto p-8 my-12 grid grid-cols-8 gap-12">
        <section class="col-span-3 bg-slate-50 h-fit p-8 rounded-xl space-y-4">
          <h3 id="heading-information" class="flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
            </svg>
            Information
          </h3>
          <h3 id="heading-images" class="text-slate-300 flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
            </svg>
            Images
          </h3>
          <h3 id="heading-ownership" class="text-slate-300 flex gap-2 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24">
              <path fill="currentColor" d="M15.835 11.63L9.205 5.2C8.79 4.799 8 5.042 8 5.57v12.86c0 .528.79.771 1.205.37l6.63-6.43a.498.498 0 000-.74"></path>
            </svg>
            Ownership
          </h3>
        </section>
        <section class="col-span-5 space-y-4">
          <section id="header">
            <h2>Submit a workplace</h2>
            <p>Feel free to submit your favorite workplace</p>
          </section>
          <form
            id="form"
            class="space-y-2"
            hx-post="/workplaces/submit"
            hx-swap="transition:true"
            hx-ext="disable-element"
            hx-disable-element="#submitBtn"
            hx-target="#msg"
          >
            <input name="name" placeholder="Workplace name" />
            <input name="address" placeholder="Workplace address" />
            <select name="city">
              {cities.map(({ id, name }) => {
                return <option value={id}>{name}</option>;
              })}
            </select>
            <select name="type">
              <option value="cafe">Cafe</option>
              <option value="coworking">Coworking</option>
              <option value="hotel">Hotel</option>
              <option value="restaurant">Restaurant</option>
            </select>
            <button id="submitBtn" type="submit">
              Proceed
            </button>
            <div id="msg"></div>
          </form>
        </section>
      </main>
    </TemplateBase>
  );
};

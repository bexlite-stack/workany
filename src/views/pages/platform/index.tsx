import { TUserJWT } from "../../../types/app";
import { Header } from "../../templates/header";
import { TemplateBase } from "../../templates/templateBase";

export const Home = ({ user, query }: { user: TUserJWT; query: Record<string, any> }) => {
  const { city, type, limit } = query;

  function getFilters() {
    if (city) {
      return `?city=${city}`;
    } else if (type) {
      return `?type=${type}`;
    } else if (limit) {
      return `?limit=${limit}`;
    } else {
      return "";
    }
  }

  return (
    <TemplateBase>
      <Header user={user} />
      <main class="w-full m-auto p-8 space-y-12">
        <section class="relative overflow-hidden bg-gradient-to-r from-slate-50 from-50% to-100% to-slate-300 p-12 lg:p-16 rounded-xl border space-y-6">
          <h1 class="w-full lg:w-[500px] text-2xl lg:text-5xl text-slate-500">Find better places to work and meet new people.</h1>
          <h3 class="text-slate-400">This website is a platform to help you find places to work.</h3>
          <div class="absolute -top-10 right-0 text-slate-200">
            <svg xmlns="http://www.w3.org/2000/svg" width="700" height="700" viewBox="0 0 24 24">
              <g fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"></path>
                <path
                  strokeLinecap="round"
                  d="M3 8.008S5.937 11 10.437 11c3.063 0 4.689-1.773 6.063-2.244 2.583-.886 4.5-.748 4.5-.748m-18 6s2.089-.138 4.903.748C9.401 15.226 11.172 17 14.51 17c3.012 0 5.381-1.129 6.761-2"
                ></path>
              </g>
            </svg>
          </div>
          <div class="absolute bottom-10 right-10 flex gap-2">
            <a href="/?city=surabaya" hx-boost="true" class="tag">
              Surabaya
            </a>
            <a href="/?city=jakarta" hx-boost="true" class="tag">
              Jakarta
            </a>
            <a href="/?city=jogjakarta" hx-boost="true" class="tag">
              Jogjakarta
            </a>
            <a href="/?city=bandung" hx-boost="true" class="tag">
              Bandung
            </a>
            <a href="/?city=bogor" hx-boost="true" class="tag">
              Bogor
            </a>
          </div>
        </section>
        <section
          class="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-5 gap-6"
          hx-get={`/workplaces/all${getFilters()}`}
          hx-swap="transition:true"
          hx-trigger="load"
        ></section>
      </main>
    </TemplateBase>
  );
};

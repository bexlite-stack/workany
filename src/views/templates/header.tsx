import uniqolor from "uniqolor";
import { TUserJWT } from "../../types/app";

export const Header = ({ user }: { user: TUserJWT }) => {
  return (
    <header x-data="{ open: false }" x-on:mouseleave="open = false" class="flex justify-between items-center p-4 border-b">
      <a href="/" hx-boost="true" hx-swap="transition:true">
        <div class="text-rose-500 font-bold text-lg tracking-tighter flex gap-2 items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
            <g fill="none" stroke="currentColor">
              <path d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2s10 4.477 10 10Z" />
              <path
                strokeLinecap="round"
                d="M3 8.008S5.937 11 10.437 11c3.063 0 4.689-1.773 6.063-2.244c2.583-.886 4.5-.748 4.5-.748m-18 6s2.089-.138 4.903.748C9.401 15.226 11.172 17 14.51 17c3.012 0 5.381-1.129 6.761-2"
              />
            </g>
          </svg>
          workany.
        </div>
      </a>
      <div class="hidden lg:flex bg-white shadow-sm font-medium tracking-tight gap-4 border rounded-full py-2 px-6">
        <a href="/?type=cafe" hx-boost="true">
          Cafe
        </a>
        <a href="/?type=coworking" hx-boost="true">
          Coworking Space
        </a>
        <a href="/?type=hotel" hx-boost="true">
          Hotel
        </a>
        <a href="/?type=restaurant" hx-boost="true">
          Restaurant
        </a>
      </div>
      <div class="flex gap-4 items-center">
        {user ? (
          <>
            <a href="/workplaces/submit" hx-boost="true" hx-swap="transition:true">
              Submit
            </a>
            <div x-on:click="open = !open" class="p-2 cursor-pointer border rounded-full relative">
              <div
                style={{ background: uniqolor(user.name).color }}
                class="w-6 h-6 text-xs text-white font-semibold flex justify-center items-center rounded-full"
              >
                {user.name.toString().charAt(0)}
              </div>
              <div x-show="open" class="absolute z-50 shadow-xl shadow-slate-400 w-[180px] top-12 right-0 bg-white border rounded-xl overflow-hidden">
                <div class="px-4 py-3 border-b cursor-default">{user.name}</div>
                <div hx-post="/logout" class="px-4 py-3 cursor-pointer hover:bg-slate-100">
                  Logout
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/register">
              <button class="w-fit py-2">Get Started</button>
            </a>
          </>
        )}
      </div>
    </header>
  );
};

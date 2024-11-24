import { TemplateBase } from "../../templates/templateBase";
import { SocialLogin } from "./socialLogin";

export const Login = () => {
  return (
    <TemplateBase>
      <main class="relative h-screen grid grid-cols-1 lg:grid-cols-2">
        <a href="/" hx-boost="true" class="absolute z-50 top-10 left-10">
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
        <section class="hidden lg:block bg-gradient-to-b from-transparent to-rose-200 relative"></section>
        <section class="flex justify-center items-center">
          <div class="w-[300px] space-y-6">
            <form class="w-[300px] space-y-6" hx-post="/login" hx-target="#msg">
              <section>
                <h2>Login</h2>
                <p>Welcome back, please login!</p>
              </section>
              <section class="space-y-2">
                <input name="email" placeholder="Email" required />
                <input name="password" placeholder="Password" type="password" required />
                <button type="submit">Login</button>
                <SocialLogin />
                <div id="msg"></div>
              </section>
            </form>{" "}
            <div>
              Don't have an account?{" "}
              <a href="/register" hx-boost="true">
                Register
              </a>
            </div>
          </div>
        </section>
      </main>
    </TemplateBase>
  );
};

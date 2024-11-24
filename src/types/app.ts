import { Context } from "elysia";

export type TUserJWT = Record<string, string | number>;

export interface ContextWithJWT extends Context {
  jwt: {
    readonly sign: (payload: Record<string, unknown>) => Promise<string>;
    readonly verify: (token: string) => Promise<false | Record<string, unknown>>;
  };
  user: TUserJWT;
}

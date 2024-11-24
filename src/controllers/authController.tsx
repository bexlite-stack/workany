import { Context } from "elysia";
import { Login } from "../views/pages/auth/login";
import { Register } from "../views/pages/auth/register";
import { userServices } from "../services/usersServices";
import { ContextWithJWT } from "../types/app";
import { google } from "../utils/auth";
import { generateCodeVerifier, generateState } from "arctic";

export const authController = {
  renderRegisterUI: () => {
    return <Register />;
  },

  renderLoginUI: () => {
    return <Login />;
  },

  handleRegisterUser: async ({ body }: Context) => {
    const { name, email, password } = body as Record<string, string>;

    if (!name || !email || !password) {
      return <div class="msg msg-error">All fields are required</div>;
    }

    const createUser = await userServices.createUser(name, email, password);

    if (!createUser) {
      return <div class="msg msg-error">Error creating user</div>;
    }

    return <div class="msg msg-success">User created successfully</div>;
  },

  handleLoginUser: async ({ jwt, body, set, cookie: { token } }: ContextWithJWT) => {
    const { email, password } = body as Record<string, string>;

    if (!email || !password) {
      return <div class="msg msg-error">All fields are required</div>;
    }

    const user = await userServices.findUser(null, email);

    if (!user) {
      return <div class="msg msg-error">User not found</div>;
    }

    const isPasswordValid = await Bun.password.verify(password, user.password as string);

    if (!isPasswordValid) {
      return <div class="msg msg-error">Invalid password</div>;
    }
    const tokenJwt = await jwt.sign({ id: user.id, name: user.name, email: user.email, role: user.role, avatar: user.avatar });

    token.httpOnly = true;
    token.path = "/";
    token.secure = process.env.NODE_ENV === "production";
    token.value = tokenJwt;

    return new Response(null, {
      headers: { "HX-Redirect": "/" },
    });
  },

  handleLoginWithGoogle: async ({ cookie: { code_verifier } }: Context) => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    code_verifier.path = "/";
    code_verifier.value = codeVerifier;

    const url = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ["profile", "email"],
    });

    return new Response(null, {
      headers: {
        "HX-Redirect": url.href,
      },
    });
  },

  handleLoginWithGoogleCallback: async ({ jwt, set, query, cookie: { code_verifier, token } }: ContextWithJWT) => {
    const { code } = query;
    const codeVerifier = code_verifier.value;

    const tokens = await google.validateAuthorizationCode(code!, codeVerifier);
    const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
    const user = await response.json();

    const currentUser = await userServices.findUser("", user.email);

    if (!currentUser) {
      const newUser = await userServices.createUser(user.name, user.email, null);

      const jwt_token = await jwt.sign({
        id: newUser?.id,
        name: newUser?.name,
        email: newUser?.email,
        avatar: "",
      });

      token.httpOnly = true;
      token.path = "/";
      token.value = jwt_token;

      return (set.redirect = "/");
    }

    // create token
    const jwt_token = await jwt.sign({
      id: currentUser?.id,
      name: currentUser?.name,
      email: currentUser?.email,
      avatar: "",
    });

    token.httpOnly = true;
    token.path = "/";
    token.value = jwt_token;

    return (set.redirect = "/");
  },

  handleLogoutUser: ({ cookie: { token } }: ContextWithJWT) => {
    token.remove();

    return new Response(null, {
      headers: { "HX-Redirect": "/" },
    });
  },
};

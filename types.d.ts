export interface Todo {
    id?: number;
    userid: string;
    task: string;
    complete: boolean;
}

export type Users = {
    name: string;
    email: string;
    img?: string;
    providerid?: string;
    provider?: string;
    password?: string;
};

import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      accessToken: string
      refreshToken: string
      accessTokenExpires: number
      refreshTokenExpires: number
    } & DefaultSession["user"]
  }

  interface JWT {
    accessToken: string
    refreshToken: string
    accessTokenExpires: number
    refreshTokenExpires: number
  }
}

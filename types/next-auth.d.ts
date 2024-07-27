import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    id: string;
    role: number;
    username: string;
  }

  interface User {
    id: string;
    role: number;
    username: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: number;
    username: string;
  }
}

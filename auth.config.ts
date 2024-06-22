import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authFormSchema } from "./lib/utils";
import { ZodError } from "zod";
import connectDB from "./lib/db";
import bcrypt from "bcryptjs";

const formSchema = authFormSchema();

export default {
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        // await connectDB();
        // try {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        //   const user = await getUserByEmail(email);
        //   console.log(user);
        //   if (!user.email && !user.password) {
        //     return null;
        //   }

        //   const isPasswordCorrect = await bcrypt.compare(
        //     password,
        //     user.password
        //   );

        //   if (isPasswordCorrect) {
        //     return user;
        //   }

        // } catch (error) {
        //   if (error instanceof ZodError) {
        //     return null;
        //   }
        //   throw new Error(
        //     error instanceof Error ? error.message : String(error)
        //   );
        // }

        if (email === "chamila@gmail.com" && password === "chamila123") {
          return { id: "1", name: "Chamila", email: "chamila@gmail.com" };
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;

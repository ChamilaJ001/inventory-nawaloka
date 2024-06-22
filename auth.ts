import NextAuth from "next-auth";
import authConfig from "./auth.config";
import credentials from "next-auth/providers/credentials";

export const { handlers, auth, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ token, session }) {
      // if (token.email && session.user) {
      //   session.user.id = token.sub;
      // }
      return session;
    },
    async jwt({ token }) {
      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
});

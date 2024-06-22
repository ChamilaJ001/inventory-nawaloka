// import CredentialsProvider from "next-auth/providers/credentials";
// import bcrypt from "bcryptjs";
// import NextAuth from "next-auth/next";
// import connectDB from "@/config/db";
// import User from "@/models/User";

// type SignInCallbackParams = {
//   user: any;
//   account: any;
// };

// type SessionCallbackParams = {
//   session: any;
//   user: any;
//   token: any;
// };

// type TokenCallbackParams = {
//   token: any;
//   account: any;
// };

// export const authOptions = {
//   providers: [
//     CredentialsProvider({
//       id: "credentials",
//       name: "credentials",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "text",
//         },
//         password: {
//           label: "Password",
//           type: "password",
//         },
//       },

//       async authorize(credentials, req) {
//         await connectDB();

//         try {
//           const user = await User.findOne({ email: credentials?.email });

//           if (user) {
//             const isPasswordCorrect = await bcrypt.compare(
//               credentials?.password!,
//               user.password
//             );

//             if (isPasswordCorrect) {
//               return user;
//             }
//           }
//         } catch (error) {
//           throw new Error(
//             error instanceof Error ? error.message : String(error)
//           );
//         }
//       },
//     }),
//   ],

//   callbacks: {
//     async signIn({
//       user,
//       account,
//     }: SignInCallbackParams): Promise<string | boolean> {
//       if (account?.provider === "credentials") {
//         return user;
//       }
//       return false;
//     },
//   },
// };

// export const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import { handlers } from "@/auth"; // Referring to the auth.ts we just created
export const { GET, POST } = handlers;

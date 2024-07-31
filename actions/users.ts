"use server";

import { CredentialsSignin } from "next-auth";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { signOut } from "@/auth";

export const login = async (data: any) => {
  const email = data.email;
  const password = data.password;

  try {
    await signIn("credentials", {
      redirect: false,
      callbackUrl: "/",
      email,
      password,
    });
  } catch (error) {
    const err = error as CredentialsSignin;
    return err.cause;
  }
  redirect("/");
};

export async function signOutUser() {
  await signOut();
}

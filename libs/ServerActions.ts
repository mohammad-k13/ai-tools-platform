"use server";

import { z } from "zod";
import { LoginSchema, SignupSchema } from "./formSchema";
import { createUser } from "@/convex/authAdapter";
import { signIn } from "@/auth";

export const SignupAction = async (prevState: any, formData: FormData) => {
	const userData: z.infer<typeof SignupSchema> = {
		username: formData.get("username") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

      return [];

};

export const LoginAction = async (prevState: any, formData: FormData) => {
      const userData: z.infer<typeof LoginSchema> = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

      await signIn("github", {redirectTo: "/", })
      return [];
}
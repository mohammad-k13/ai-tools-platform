"use server";

import { z } from "zod";
import { LoginSchema, SignupSchema } from "./formSchema";

export const SignupAction = async (prevState: any, formData: FormData) => {
	const userData: z.infer<typeof SignupSchema> = {
		username: formData.get("username") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

      const result = SignupSchema.safeParse(userData);
      if(!result.success) {
            return result.error.issues;
      }
};

export const LoginAction = async (prevState: any, formData: FormData) => {
      const userData: z.infer<typeof LoginSchema> = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

      const result = SignupSchema.safeParse(userData);
      if(!result.success) {
            return result.error.issues;
      }
}
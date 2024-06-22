"use server";

import { z } from "zod";
import { LoginSchema, SignupSchema } from "./formSchema";
import { signupStateType } from "@/components/Signup";

export const SignupAction = async (prevState: any, formData: FormData) => {
	let state: signupStateType = { errors: {} };

	const userData: z.infer<typeof SignupSchema> = {
		username: formData.get("username") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};
	const validationResult = SignupSchema.safeParse(userData);

	if (!validationResult.success) {
		state = { errors: { ...validationResult.error.flatten().fieldErrors } };
		return state;
	}

	return state;
};

export const LoginAction = async (prevState: any, formData: FormData) => {
	const userData: z.infer<typeof LoginSchema> = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	return [];
};

"use server";

import { z } from "zod";
import { LoginSchema, SignupSchema } from "./formSchema";
import { FormActionStateType } from "@/types";

export const SignupAction = async (prevState: any, formData: FormData) => {
	let errors: FormActionStateType = { errors: {} };

	const userData: z.infer<typeof SignupSchema> = {
		username: formData.get("username") as string,
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};
	const validationResult = SignupSchema.safeParse(userData);

	if (!validationResult.success) {
		errors = { errors: { ...validationResult.error.flatten().fieldErrors } };
		return errors;
	}

	return errors;
};

export const LoginAction = async (prevState: any, formData: FormData) => {
	let errors: FormActionStateType = { errors: {} };

	const userData: z.infer<typeof LoginSchema> = {
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	};

	const validationResult = LoginSchema.safeParse(userData);

	if (!validationResult.success) {
		errors = { errors: { ...validationResult.error.flatten().fieldErrors } };
		return errors;
	}

	return errors;
};

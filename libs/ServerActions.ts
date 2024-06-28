"use server";

import { cookies } from "next/headers";
import { decrypt, encrypt, FormValidation } from ".";
import { LoginSchema, SignupSchema } from "./form.schema";
import { FormActionStateType } from "@/types";


export const LoginAction = async (prevState: any, formData: FormData) => {
	let State: FormActionStateType = {
		info: {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		},
		isInfoError: false,
	};

	// validation form data via Zod
	const validationResult = LoginSchema.safeParse(State.info);
	if (!validationResult.success) {
		State = {
			info: {
				...validationResult.error.flatten().fieldErrors,
			},
			isInfoError: true,
		};
		return State;
	}

	try {
		const response = await fetch("https://trustworthy-raven-100.convex.site/get-users");
		console.log(response);
		const user = await response.json();

		console.log("users: " + user);
		if (user) {
			console.log("log in");
		} else {
			console.log("don't log in");
		}
	} catch (err: any) {
		console.log(err.message);
	}

	return State;
};

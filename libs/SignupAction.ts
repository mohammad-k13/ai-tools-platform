"use server";

import { type FormActionStateType } from "@/types";
import { SignupSchema } from "./form.schema";
import { CreateHash, CreateSession, FormValidation, SetCookie } from "./";
import { CreateUserAction, GetSingleUserAction } from "./db/Actions/users.action";
import { CreateSessionAction } from "./db/Actions/session.action";
import { cookies } from "next/headers";

export const SignupAction = async (prevState: any, formData: FormData): Promise<FormActionStateType> => {
	let State: FormActionStateType = {
		info: {
			username: formData.get("username") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		},
		isInfoError: false,
	};

	//validation form
	const validationResult = FormValidation(SignupSchema)(State.info).errors;
	if (validationResult !== null)
		return (State = {
			isInfoError: true,
			info: { ...validationResult },
		});

	const hashedPassword = await CreateHash(State.info.password);
	State = { info: { ...State.info, password: hashedPassword }, isInfoError: false };

	try {
		// has user aleardy an account?
		const isUserExist = await GetSingleUserAction(State.info.email);
		if (isUserExist.length !== 0) return { info: { email: ["This email has created account"] }, isInfoError: true };

		// create user
		const userId = await CreateUserAction(State.info);
		if (userId === "") throw new Error("error has occure!");

		// create session
		const session = await CreateSession({ ...State.info, username: State.info.username! });
		const sessionId = await CreateSessionAction(userId, session);

		// create cookie and save sessionId
		const hashedSessionId = await CreateHash(sessionId);
		SetCookie("session_id", hashedSessionId);
	} catch (err) {
		console.log(err);
	}

	return State;
};

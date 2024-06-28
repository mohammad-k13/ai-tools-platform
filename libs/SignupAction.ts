"use server";

import { type FormActionStateType } from "@/types";
import { SignupSchema } from "./form.schema";
import { CreateSession, FormValidation } from "./";
import { CreateUserAction } from "./db/Actions/users.action";
import { CreateSessionAction } from "./db/Actions/session.action";

export const SignupAction = async (prevState: any, formData: FormData): Promise<FormActionStateType> => {
	let State: FormActionStateType = {
		info: {
			username: formData.get("username") as string,
			email: formData.get("email") as string,
			password: formData.get("password") as string, //todo: should hash
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

	try {
		//todo - has user aleardy an account?

		// create user
		const userId = await CreateUserAction(State.info);
		if(userId === "") throw new Error("error has occure!");

		// create session
		const session = await CreateSession({...State.info, username: State.info.username! });
		const sessionId = await CreateSessionAction(userId, session);

		//todo - create cookie and save sessionId
	} catch (err) {
		console.log(err);
	}

	return State;
};

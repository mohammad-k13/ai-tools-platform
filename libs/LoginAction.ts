"use server";
import { CompareHash, CreateSession, FormValidation, GetCookie, SetCookie } from ".";
import { LoginSchema } from "./form.schema";
import { FormActionStateType } from "@/types";
import { GetSingleUserAction } from "./db/Actions/users.action";
import { redirect } from "next/navigation";
import email from "next-auth/providers/email";

export const LoginAction = async (prevState: any, formData: FormData): Promise<FormActionStateType> => {
	let State: FormActionStateType = {
		info: {
			email: formData.get("email") as string,
			password: formData.get("password") as string,
		},
		isInfoError: false,
	};

	//if has session should redirect
	const hasSession = GetCookie("session_id");
	if (hasSession) redirect("/dashboard");

	//validation form
	const validationResult = FormValidation(LoginSchema)(State.info).errors;
	if (validationResult !== null)
		return (State = {
			isInfoError: true,
			info: { ...validationResult },
		});

	try {
		const user = await GetSingleUserAction(State.info.email);
		console.log(user);

		if (user.length !== 0) {
			const isPasswordCorrect = await CompareHash(State.info.password, user[0].password);
			if (isPasswordCorrect) {
				const session = await CreateSession({ ...State.info, username: user[0].username });
				SetCookie("session_id", session);

				redirect("/dashboard");
			} else {
				return { info: { password: ["password is incorrect!"] }, isInfoError: true };
			}
		} else {
			return { info: { email: ["Email Not Found"] }, isInfoError: true };
		}
	} catch (err: any) {
		console.log(err.message);
	}

	return State;
};

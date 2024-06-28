import { FormActionStateType } from "@/types";

export const CreateUserAction = async (State: FormActionStateType["info"]) => {
	try {
		const responseUserId = await fetch(process.env.DEPLOYMENT_NAME + "/create-user", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({
				...State,
				imgUrl: "",
			}),
		});
		const userId = (await responseUserId.json()) as string;
		return userId;
	} catch (err) {
		console.log(err);
		return "";
	}
};

export const HasUserCreatedAccout = async (userInfo: { email: string; password: string }) => {
	const reposne = await fetch(process.env.DEPLOYMENT_NAME + "/get-singleUser", {
		method: "POST",
		headers: {
			"content-type": "application/json",
		},
		body: JSON.stringify(userInfo),
	});

	//user is array if is empty user doesn't exist;
	const user = await reposne.json();
	return user.length !== 0 ? user : null;
};

export const GetUserById = async () => {};

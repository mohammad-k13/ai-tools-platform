export const CreateSessionAction = async (userId: string, session: string) => {
    
	const sessionReqBody = JSON.stringify({ userId, session });
	const sessionResponse = await fetch(process.env.DEPLOYMENT_NAME + "/create-session", {
		method: "POST",
		body: sessionReqBody,
	});

	const sessionId = (await sessionResponse.json()) as string;
	return sessionId;
};

export const GetUserWithSession = async () => {

}



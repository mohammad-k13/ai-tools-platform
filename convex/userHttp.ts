import { api, internal } from "./_generated/api";
import { httpAction, internalQuery } from "./_generated/server";

export const getAllUsers = httpAction(async (ctx, req) => {
	const users = await ctx.runQuery(api.users.GetAllUsers);

	return new Response('{"id":2,"name":"mohammad","imgUrl":"Http2ServerRequest"}', {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
});

export const getSingleUser = httpAction(async (ctx, req) => {
	const { email } = await req.json();

	const user = await ctx.runQuery(api.users.GetSingleUser, {
		email,
	});

	return new Response(JSON.stringify(user), {
		status: 200,
	});
});

export const createUser = httpAction(async (ctx, req) => {
	const {
		username,
		email,
		password,
		imgUrl = "",
	} = (await req.json()) as {
		username: string;
		email: string;
		password: string;
		imgUrl?: string;
	};

	const result = await ctx.runMutation(api.users.CreateUser, {
		email,
		password,
		username,
		imgUrl,
	});

	return new Response(JSON.stringify(result), {
		headers: {
			"content-type": "application/json",
		},
		status: 200,
	});
});

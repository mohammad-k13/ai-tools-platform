import { CreateHash, encrypt } from "@/libs";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

export const CreateSession = httpAction(async (ctx, req) => {
	const { userId, session } = await req.json();
	const sessionId = await ctx.runMutation(api.session.CreateSession, {
		session,
		userId,
	});

	return new Response(JSON.stringify(sessionId), {
		status: 200,
	});
});

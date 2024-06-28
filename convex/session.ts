import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { encrypt } from "@/libs";
import schema from "./schema";

export const CreateSession = mutation({
	args: {
		userId: v.id("users"),
		session: v.string(),
	},
	handler: async (ctx, args) => {
		const { userId, session } = args;

		const sessionId = await ctx.db.insert("session", {
			userId,
			session,
		});
		return sessionId;
	},
});

import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateUser = mutation({
	args: {
		username: v.string(),
		email: v.string(),
		password: v.string(),
		imgUrl: v.optional(v.string()),
	},
	handler: async (ctx, { email, password, username, imgUrl = "" }) => {
		const userId = await ctx.db.insert("users", { email, password, username, imgUrl });
		return userId;
	},
});

export const GetUserByEmail = query({
	args: {
		email: v.string(),
	},
	handler: async (ctx, { email }) => {
		const user = await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("email"), email))
			.order("desc")
			.take(100);
		return user;
	},
});

export const GetUserById = query({
	args: {
		userId: v.id("users"),
	},
	handler: async (ctx, { userId }) => {
		const user = await ctx.db.get(userId);
		return user;
	},
});

export const GetSingleUser = query({
	args: {
		email: v.string(),
		password: v.string(),
	},
	handler: async (ctx, args) => {
		const { email, password } = args;

		return await ctx.db
			.query("users")
			.filter((q) => q.eq(q.field("email"), email))
			.filter((q) => q.eq(q.field("password"), password))
			.collect();
	},
});

export const GetAllUsers = query({
	args: {},
	handler: async (ctx, _) => {
		return await ctx.db.query("users").collect();
	},
});

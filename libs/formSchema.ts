import { z } from "zod";

export const LoginSchema = z.object({
	email: z
		.string()
		.email({ message: "Invalid email address" })
		.refine((email) => email.trim() === "", { message: "email required!" }),
	password: z.string().min(7, { message: "Password must be at least 7 charechter." }),
});

export const SignupSchema = z.object({
	username: z.string().min(3, { message: "Username must bet at least 3 charechter" }),
	email: z.string().email({ message: "Invalid email address" }),
	password: z
		.string()
		.min(7, { message: "Password must be at least 7 charechter." })
		.refine((password) => /[A-Z]/.test(password), {
			message: "Password must include at least one uppercase letter",
		})
		.refine((password) => /[0-9]/.test(password), {
			message: "Password must include at least one number",
		}),
});

import { ConvexAdapter } from "@/app/ConvexAdapter";
import { SignJWT, importPKCS8 } from "jose";
import NextAuth from "next-auth";
import { type Provider } from "next-auth/providers";
import credentials from "next-auth/providers/credentials";
import github from "next-auth/providers/github";

const CONVEX_SITE_URL = process.env.NEXT_PUBLIC_CONVEX_URL!.replace(/.cloud$/, ".site");

const providers: Provider[] = [
	github,
	credentials({
		credentials: { password: { label: "Password", type: "password" } },
		authorize(c) {
			if (c.password !== "password") return null;
			return {
				id: "test",
				name: "Test User",
				email: "test@example.com",
			};
		},
	}),
];

export const providerMap = providers.map((provider) => {
	if (typeof provider === "function") {
		const providerData = provider();
		return { id: providerData.id, name: providerData.name };
	} else {
		return { id: provider.id, name: provider.name };
	}
});

export const { handlers, signIn, signOut, auth } = NextAuth({
	debug: true,
	providers,
	adapter: ConvexAdapter,
	callbacks: {
		async session({ session }) {
			const privateKey = await importPKCS8(process.env.CONVEX_AUTH_PRIVATE_KEY!, "RS256");
			const convexToken = await new SignJWT({
				sub: session.userId,
			})
				.setProtectedHeader({ alg: "RS256" })
				.setIssuedAt()
				.setIssuer(CONVEX_SITE_URL)
				.setAudience("convex")
				.setExpirationTime("1h")
				.sign(privateKey);
			return { ...session, convexToken };
		},
	},
	pages: {
		signIn: "/logIn",
		newUser: "/signUp",
	},
});

declare module "next-auth" {
	interface Session {
		convexToken: string;
	}
}

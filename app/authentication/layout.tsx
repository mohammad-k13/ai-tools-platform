import { GetCookie } from "@/libs";
import clsx from "clsx";
import { getSession } from "next-auth/react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = cookies().get("session_id");
	if (session) {
		redirect("/dashboard");
	}
	return (
		<section className={clsx("w-full h-screen flex items-center justify-center bg-orange-100")}>
			<main className="block relative max-sm:w-[94%] sm:w-[450px] md:w-[850px] h-[550px] bg-white/90 shadow-lg shadow-orange-500/30 rounded-xl">
				{children}
			</main>
		</section>
	);
}

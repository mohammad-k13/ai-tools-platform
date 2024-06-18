import clsx from "clsx";
import React from "react";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
	signup: React.ReactNode;
}>) {
	return (
		<section
			className={clsx(
				"w-full h-screen flex items-center justify-center bg-orange-100",
			)}>
			<main className="hidden md:block relative w-[850px] h-[500px] bg-white/90 shadow-lg shadow-orange-500/30 rounded-xl">
				{children}
			</main>
		</section>
	);
}

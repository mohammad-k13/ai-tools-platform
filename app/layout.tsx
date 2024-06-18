import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";

import { roboto_font } from "./fonts";
import "./globals.css";
import clsx from "clsx";
import ConvexClientProvider from "./ConvexProviderWithAuth";
import { auth } from "@/auth";

export const metadata: Metadata = {
	title: "AI Tools Platform",
	description: "A Platform to use bounch of AIs",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const session = await auth();
	return (
		<html lang="en">
			<body className={clsx("h-screen", roboto_font.className)}>
				<NextUIProvider>
					<ConvexClientProvider session={session}>{children}</ConvexClientProvider>
				</NextUIProvider>
			</body>
		</html>
	);
}

import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { roboto_font } from "./fonts";
import "./globals.css";
import clsx from "clsx";
import ConvexClientProvider from "./ConvexClientProvider";

export const metadata: Metadata = {
	title: "AI Tools Platform",
	description: "A Platform to use bounch of AIs",
};

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={clsx("h-screen", roboto_font.className)}>
				<SpeedInsights />
				<NextUIProvider>
					<ConvexClientProvider>{children}</ConvexClientProvider>
				</NextUIProvider>
			</body>
		</html>
	);
}

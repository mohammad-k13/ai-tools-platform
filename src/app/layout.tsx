import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/react";

import { roboto_font } from "./fonts";
import "./globals.css";
import clsx from "clsx";

export const metadata: Metadata = {
	title: "AI Tools Platform",
	description: "A Platform to use bounch of AIs",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={clsx("h-screen", roboto_font.className)}>
				<NextUIProvider>{children}</NextUIProvider>
			</body>
		</html>
	);
}

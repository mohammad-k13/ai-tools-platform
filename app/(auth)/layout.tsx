import clsx from "clsx";

export default async function AuthLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<section className={clsx("w-full h-screen bg-white flex items-center justify-center")}>{children}</section>
	);
}

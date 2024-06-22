"use client";

import { LoginAction } from "@/libs/ServerActions";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { useEffect } from "react";

const Login = ({ toggelAuthType }: { toggelAuthType: () => void }) => {
	const [state, formAction] = useFormState(LoginAction, []);

	useEffect(() => {
		console.table(state);
		return () => {
			console.table(state);
		};
	}, [state]);

	return (
		<motion.div
			className="w-[40%] h-full flex items-center justify-center flex-col absolute right-[40px]"
			initial={{ x: 100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -100, opacity: 0 }}>
			<header className="w-full flex flex-col gap-3 mb-7">
				<h2 className="text-4xl font-bold text-center w-full">Log In!</h2>
				<small className="text-sm text-muted text-gray-400 capitalize w-full text-center">
					login to your account and enjoy all free features!
				</small>
			</header>

			<main className="w-full">
				<form action={formAction} className="w-full flex flex-col gap-5">
					<Input isRequired type="email" label="Email" size="sm" className="w-full" name="email" />
					<Input
						isRequired
						type="password"
						label="Password"
						size="sm"
						className="w-full"
						name="passowrd"
					/>
					<Button size="md" color="primary" type="submit">
						Log In
					</Button>
				</form>
			</main>

			<footer className="mt-7">
				<small className="text-xs text-muted text-gray-400 underline capitalize">
					do you have an account:{" "}
					<Link
						href={"/authentication?auth-type=signup"}
						className="text-blue-500"
						onClick={toggelAuthType}>
						create an accounts
					</Link>
				</small>
			</footer>
		</motion.div>
	);
};

export default Login;

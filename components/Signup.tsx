"use client";
import { island_moments } from "@/app/fonts";
import { SignupAction } from "@/libs/ServerActions";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const Signup = ({ toggelAuthType }: { toggelAuthType: () => void }) => {
	const [state, formAction] = useFormState(SignupAction, []);

	useEffect(() => {
		console.table(state);
		return () => {
			console.table(state);
		};
	}, [state]);

	return (
		<motion.section
			className="w-[40%] h-full flex items-center justify-center flex-col absolute left-[40px]"
			initial={{ x: 100, opacity: 0 }}
			animate={{ x: 0, opacity: 1 }}
			exit={{ x: -100, opacity: 0 }}>
			<header className="w-full flex flex-col gap-3 mb-7">
				<h2 className="text-4xl font-bold text-center w-full">Sign Up!</h2>
				<small className="text-sm text-muted text-gray-400 capitalize w-full text-center">
					Sign Up for free to use all features for free!
				</small>
			</header>

			<main className="w-full">
				<form action={formAction} className="w-full flex flex-col gap-5">
					<Input
						isRequired
						type="text"
						label="Username"
						size="sm"
						className="w-full"
						name="username"
					/>
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
						Create Account
					</Button>
				</form>
			</main>

			<footer className="mt-7">
				<small className="text-xs text-muted text-gray-400 underline capitalize">
					do you have an account:{" "}
					<Link
						href={"/authentication?auth-type=login"}
						className="text-blue-500"
						onClick={toggelAuthType}>
						Login
					</Link>
				</small>
			</footer>
		</motion.section>
	);
};

export default Signup;

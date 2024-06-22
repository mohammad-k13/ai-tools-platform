"use client";
import { island_moments } from "@/app/fonts";
import { SignupAction } from "@/libs/ServerActions";
import { Button } from "@nextui-org/button";
import { Code } from "@nextui-org/code";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import FormButton from "./FormButton";
export type signupStateType = {
	errors: {
		username?: string[] | undefined;
		email?: string[] | undefined;
		password?: string[] | undefined;
	};
};
const signupInitialState: signupStateType = { errors: {} };

const Signup = ({ toggelAuthType }: { toggelAuthType: () => void }) => {
	const [state, formAction] = useFormState(SignupAction, signupInitialState);

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
				<form action={formAction} className="w-full flex flex-col gap-4 transition-all">
					{/* username input */}
					<motion.div className="flex flex-col transition-all" layout>
						<Input
							isRequired
							type="text"
							label="Username"
							size="sm"
							className="w-full mb-1"
							name="username"
						/>
						<AnimatePresence mode="popLayout">
							{state.errors?.username && (
								<motion.small
									
									initial={{ x: -20, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									exit={{ x: 20, opacity: 0 }}
									transition={{ duration: 0.25 }}
									className="text-red-500 text-xs w-full text-start">
									{state.errors.username}
								</motion.small>
							)}
						</AnimatePresence>
					</motion.div>

					{/* email input */}
					<div className="flex flex-col">
						<Input
							isRequired
							type="email"
							label="Email"
							size="sm"
							className="w-full mb-1"
							name="email"
						/>
						{state.errors?.email && (
							<motion.small
								initial={{ x: -20, opacity: 0 }}
								animate={{ x: 0, opacity: 1 }}
								transition={{
									duration: 0.25,
									delay: state.errors.username ? 0.2 : 0,
								}}
								className="text-red-500 text-xs w-full text-start">
								{state.errors.email}
							</motion.small>
						)}
					</div>

					{/* password input */}
					<div className="flex flex-col">
						<Input
							isRequired
							type="password"
							label="Password"
							size="sm"
							className="w-full mb-1"
							name="password"
						/>
						{state.errors?.password &&
							state.errors.password.map((text, index) => (
								<motion.small
									className="text-red-500 text-xs "
									key={index}
									initial={{ x: -30, opacity: 0 }}
									animate={{ x: 0, opacity: 1 }}
									transition={{
										delay:
											state.errors.email && state.errors.username
												? index * 0.2 + 0.45
												: state.errors.email || state.errors.username
													? index * 0.2 + 0.2
													: index * 0.2,
									}}>
									{text} <br />
								</motion.small>
							))}
					</div>
					<FormButton value="Create Account" />
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

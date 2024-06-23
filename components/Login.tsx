"use client";

import { LoginAction } from "@/libs/ServerActions";
import { Button } from "@nextui-org/button";
import { motion } from "framer-motion";
import Link from "next/link";
import { Input } from "@nextui-org/input";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { FormActionStateType } from "@/types";
import InputGroup from "./InputGroup";
import FormButton from "./FormButton";

const initialState: FormActionStateType = { errors: {} };

const Login = ({ toggelAuthType }: { toggelAuthType: () => void }) => {
	const [state, formAction] = useFormState(LoginAction, initialState);

	return (
		<motion.div
			className="w-[90%] mx-auto md:w-[40%] h-full flex items-center justify-center flex-col absolute max-md:right-1/2 max-md:!translate-x-1/2 md:left[40px]"
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
					<InputGroup
						state={state}
						inputConfig={{
							className: "w-full mb-1",
							label: "Email",
							type: "email",
							name: "email",
							size: "sm",
						}}
						animationDelay={0}
					/>
					<InputGroup
						state={state}
						inputConfig={{
							className: "w-full mb-1",
							label: "Password",
							type: "password",
							name: "password",
							size: "sm",
						}}
						animationDelay={state.errors.email ? 0.2 : 0}
					/>
					<FormButton value="Login" />
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

import { island_moments } from "@/app/fonts";
import { SignupAction } from "@/libs/SignupAction";
import { Button } from "@nextui-org/button";
import { Code } from "@nextui-org/code";
import { Input } from "@nextui-org/input";
import { Spinner } from "@nextui-org/spinner";
import clsx from "clsx";
import {
	AnimatePresence,
	LayoutGroup,
	motion,
} from "framer-motion";
import Link from "next/link";
import {
	FormEvent,
	useActionState,
	useEffect,
	useState,
} from "react";
import { useFormState, useFormStatus } from "react-dom";
import FormButton from "./FormButton";
import { FormActionStateType } from "@/types";
import InputGroup from "./InputGroup";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";

const signupInitialState: FormActionStateType = {
	isInfoError: false,
	info: {
		email: "",
		username: "",
		password: "",
	},
};
const Signup = ({
	toggelAuthType,
}: {
	toggelAuthType: () => void;
}) => {
	const [actionState, formAction] = useFormState(
		SignupAction,
		signupInitialState,
	);

	return (
		<motion.section
			className="w-[90%] md:w-[40%] mx-auto h-full flex items-center justify-center flex-col absolute max-md:right-1/2 max-md:!translate-x-1/2 md:left-[40px]"
			initial={{ x: 100, opacity: 0, scale: 0 }}
			animate={{ x: 0, opacity: 1, scale: 1 }}
			exit={{ x: -100, opacity: 0, scale: 0 }}>
			<header className="w-full flex flex-col gap-3 mb-7">
				<h2 className="text-4xl font-bold text-center w-full">
					Sign Up!
				</h2>
				<small className="text-sm text-muted text-gray-400 capitalize w-full text-center">
					Sign Up for free to use all
					features for free!
				</small>
			</header>

			<main className="w-full">
				<form
					action={formAction}
					className="w-full flex flex-col gap-4 transition-all">
					<InputGroup
						state={actionState}
						inputConfig={{
							className:
								"w-full mb-1",
							label: "Username",
							name: "username",
							size: "sm",
							type: "text",
						}}
						animationDelay={0}
					/>

					<InputGroup
						state={actionState}
						inputConfig={{
							className:
								"w-full mb-1",
							size: "sm",
							type: "email",
							label: "Email",
							name: "email",
						}}
						animationDelay={
							actionState.isInfoError &&
							actionState.info
								.username
								? 0.2
								: 0
						}
					/>

					<InputGroup
						state={actionState}
						inputConfig={{
							className:
								"w-full mb-1",
							size: "sm",
							type: "password",
							label: "Password",
							name: "password",
						}}
						animationDelay={
							actionState.isInfoError &&
							actionState.info
								.email &&
							actionState.info
								.username
								? 0.45
								: actionState
											.info
											.email ||
									  actionState
											.info
											.username
									? 0.2
									: 0
						}
					/>
					<FormButton value="Create Account" />
				</form>
			</main>

			<footer className="mt-7">
				<small className="text-xs text-muted text-gray-400 underline capitalize">
					do you have an account:{" "}
					<Link
						href={
							"/authentication?auth-type=login"
						}
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

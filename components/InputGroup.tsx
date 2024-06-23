import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@nextui-org/input";
import React from "react";
import { FormActionStateType } from "@/types";

type InputGroupProps = {
	state: FormActionStateType;
	inputConfig: {
		type: "text" | "email" | "password";
		size: "lg" | "md" | "sm";
		className: string;
		name: "username" | "password" | "email";
		label: string;
	};
	animationDelay: number; //showing error of each input in order(ex: username input's error first then email input's error)
};

const InputGroup = ({
	state,
	inputConfig: { className, label, name, size, type },
	animationDelay,
}: InputGroupProps) => {
	return (
		<section className="flex flex-col">
			<Input isRequired type={type} label={label} size={size} className={className} name={name} />
			<AnimatePresence mode="sync">
				{state.errors[name] &&
					// form validation logic in singup Aciton return string[] for each input
					state.errors[name].map((text, index) => (
						<motion.small
							key={`${index}${text}`}
							initial={{ x: -20, height: 0, opacity: 0 }}
							animate={{ x: 0, height: "auto", opacity: 1 }}
							exit={{ y: -20, height: 0, opacity: 0 }}
							transition={{
								duration: 0.25,
								type: "spring",
								delay: index * 0.25 + animationDelay,
							}}
							className="text-red-500 text-xs w-full text-start">
							{text}
						</motion.small>
					))}
			</AnimatePresence>
		</section>
	);
};

export default InputGroup;

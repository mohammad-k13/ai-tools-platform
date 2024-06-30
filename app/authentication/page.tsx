"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence, animate, useAnimate } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import Login from "@/components/Login";
import Signup from "@/components/Signup";
import clsx from "clsx";

export type AuthType = "signup" | "login";

const AuthCallback = () => {
	const [scope, animate] = useAnimate();
	const sreachParams = useSearchParams();
	const [authType, setAuthType] = useState<AuthType>(sreachParams.get("auth-type") as AuthType);

	const toggleState = () => {
		setAuthType((pv) => (pv === "login" ? "signup" : "login"));

		if (authType === "signup") {
			animate(scope.current, { x: 0, y: "-50%" }, { type: "spring", duration: 0.5 });
		} else {
			animate(scope.current, { x: 447, y: "-50%" }, { type: "spring", duration: 0.5 });
		}
	};

	return (
		<div
			className={clsx("w-full h-full bg-none relative text-black", {
				"": authType === "signup",
				"": authType === "login",
			})}>
			<AnimatePresence mode="popLayout">
				{authType === "login" ? (
					<Login toggelAuthType={toggleState} />
				) : (
					<Signup toggelAuthType={toggleState} />
				)}
			</AnimatePresence>
			<motion.div
				ref={scope}
				className="max-md:hidden absolute w-[45%] h-[95%] top-1/2 left-[10px] bg-[url('/images/auth-bg.png')] bg-center rounded-xl z-50"
				initial={{ opacity: 0, y: "-50%" }}
				animate={{ opacity: 1, y: "-50%" }}
			/>
		</div>
	);
};

export default AuthCallback;

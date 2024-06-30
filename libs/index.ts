import { z } from "zod";
import { jwtDecrypt, jwtVerify, SignJWT } from "jose";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { cookieNamesType } from "@/types";

export const FormValidation = (schema: z.Schema) => {
	return (data: any) => {
		const result = schema.safeParse(data);
		if (!result.success) {
			return {
				errors: result.error.flatten().fieldErrors,
			};
		} else {
			return { errors: null };
		}
	};
};

// <!-- ========== Encrypting functions Start  ========== -->
const SECRET_KEY = process.env.SECRET_KEY! as string;
const key = new TextEncoder().encode(SECRET_KEY);

export const encrypt = async (payload: any) => {
	return await new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("15 days")
		.sign(key);
};

export const decrypt = async (input: string) => {
	const { payload } = await jwtVerify(input, key, {
		algorithms: ["HS256"],
	});

	return payload;
};

export const CreateSession = async (userData: { username: string; password: string; email: string }) => {
	const session = await encrypt(userData);
	return session;
};
// <!-- ========== Encrypting functions End  ========== -->

// <!-- ========== Start Hasing ========== -->
export const CreateHash = async (plainText: string, saltRounds: number = 16) => {
	const salt = await bcrypt.genSalt(saltRounds);

	return await bcrypt.hash(plainText, salt);
};

export const CompareHash = async (plainText: string, hashedPlainText: string) => {
	return await bcrypt.compare(plainText, hashedPlainText);
};
// <!-- ========== End Hasing ========== -->

// <!-- ========== Start Cookies ========== -->
const cookieStore = cookies();

export const SetCookie = (cookieName: cookieNamesType, value: string) => {
	cookieStore.set(cookieName, value);
};

export const GetCookie = (cookieName: cookieNamesType) => {
	const cookieVallue = cookieStore.get(cookieName);

	return cookieVallue ? cookieVallue : undefined;
};

export const DeleteCookie = (cookieName: cookieNamesType) => {
	cookieStore.delete(cookieName);
};
// <!-- ========== End Cookies ========== -->

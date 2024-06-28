import { z } from "zod";
import { jwtDecrypt, jwtVerify, SignJWT } from "jose";

export const FormValidation = (schema: z.Schema) => {
	return (data: any) => {
		const result = schema.safeParse(data);
		if (!result.success) {
			return {
				errors: result.error.flatten()
					.fieldErrors,
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

export const CreateHash = (ans: "yes" | "no") => {
	return ans === "yes" ? (plainTextPassword: string) => {
		// function for create hash
		//input should be password as plain text
	} : (plainTextPassword: string, hash: string) => {
		//function for compare has with plain text

	};
};

export const CreateSession = async (userData: {username: string, password: string, email: string} ) => {
	const session = await encrypt(userData);
	return session;
}
// <!-- ========== Encrypting functions End  ========== -->


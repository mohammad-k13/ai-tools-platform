import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { GetCookie } from "./libs";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
	const isUserAuthentication = request.cookies.has("session_id");

	if (!isUserAuthentication) {
		return NextResponse.redirect(new URL("/authentication?auth-type=login", request.url));
	}
}

// See "Matching Paths" below to learn more
export const config = {
	matcher: ["/dashboard/:path*"],
};

import { httpRouter } from "convex/server";
import { createUser, getAllUsers, getSingleUser } from "./userHttp";
import { CreateSession } from "./sessionHttp";

const http = httpRouter();

http.route({
	path: "/get-users",
	method: "GET",
	handler: getAllUsers,
});

http.route({
      path: "/get-singleUser",
      method: "POST",
      handler: getSingleUser
})

http.route({
	path: "/create-user",
	method: "POST",
	handler: createUser,
});

http.route({
	path: "/create-session",
	method: "POST",
	handler: CreateSession,
});

export default http;

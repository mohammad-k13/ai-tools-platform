import React from "react";

const Header = () => {
	return (
		<header className="w-full h-14">
			<nav className="w-full h-full max-w-[1920px] mx-auto flex items-center justify-between px-5 md:px-10 text-black max-md:text-white">
				<ul className="w-fit h-full flex items-center gap-5 font-normal [&>li:hover]:scale-125 [&>li]:transition-all">
					<li>Home</li>
					<li>Login</li>
				</ul>
				<h2 className="text-2xl">Logo</h2>
			</nav>
		</header>
	);
};

export default Header;

import Header from "@/components/Header";
import { Button } from "@nextui-org/button";
import { clsx } from "clsx";
import { island_moments } from "./fonts";

export default function Home() {
	return (
		<section className="h-screen bg-[url('/images/Home-bg.png')] bg-right-bottom md:bg-right-bottom flex flex-col">
			<Header />
			<main
				className=" flex-1 w-full flex items-center justify-center flex-col gap-5 text-white"
				style={{ height: "calc(100% - 3.5rem)" }}>
				<h1
					className={clsx(
						"w-[90%] font-semibold md:w-[850px] lg:[1200px] text-7xl lg:text-9xl md:text-5xl capitalize text-center",
						island_moments.className,
					)}>
					do magic with Ai platform
				</h1>
				<p className="w-[90%] md:w-[750px] text-justify font-light">
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores libero natus
					consequuntur, adipisci officiis hic, soluta quos labore debitis rem repellendus quo
					voluptatum quia omnis eligendi maxime necessitatibus sequi facilis ratione? Deleniti
					mollitia deserunt similique accusantium nisi repellendus iste laudantium.
				</p>
				<button className="bg-white/90 text-black/75 py-2 px-3 rounded-md hover:px-5 transition-all">
					Create Free Account
				</button>
			</main>
		</section>
	);
}
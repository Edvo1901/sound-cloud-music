import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import MainSlider from "@/components/main/MainSlider";
import { sendRequest } from "@/utils/API";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Home Page | SoundCloud clone",
	description: "Clone website",
};

export default async function HomePage() {
	const session = await getServerSession(authOptions);
	//console.log(session)
	const chillMusic = await sendRequest<IBackendRes<ITrackTop[]>>({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
		method: "POST",
		body: { category: "CHILL", limit: 10 },
	});

	const workoutMusic = await sendRequest<IBackendRes<ITrackTop[]>>({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
		method: "POST",
		body: { category: "WORKOUT", limit: 10 },
	});

	const partyMusic = await sendRequest<IBackendRes<ITrackTop[]>>({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/top`,
		method: "POST",
		body: { category: "PARTY", limit: 10 },
	});

	return (
		<Container>
			<MainSlider
				data={chillMusic?.data ? chillMusic.data : []}
				title={"Top chills"}
			/>
			<MainSlider
				data={workoutMusic?.data ? workoutMusic.data : []}
				title={"Top workout"}
			/>
			<MainSlider
				data={partyMusic?.data ? partyMusic.data : []}
				title={"Top party"}
			/>
		</Container>
	);
}

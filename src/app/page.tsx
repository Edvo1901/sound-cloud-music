import MainSlider from "@/components/main/MainSlider";
import { Container } from "@mui/material";
import { sendRequest } from "@/utils/API";

export default async function HomePage() {
	const chillMusic = await sendRequest<IBackendRes<ITrackTop[]>>({
		url: "http://localhost:8000/api/v1/tracks/top",
		method: "POST",
		body: { category: "CHILL", limit: 10 },
	});

	const workoutMusic = await sendRequest<IBackendRes<ITrackTop[]>>({
		url: "http://localhost:8000/api/v1/tracks/top",
		method: "POST",
		body: { category: "WORKOUT", limit: 10 },
	});

	const partyMusic = await sendRequest<IBackendRes<ITrackTop[]>>({
		url: "http://localhost:8000/api/v1/tracks/top",
		method: "POST",
		body: { category: "PARTY", limit: 10 },
	});

	return (
		<Container>
			<MainSlider data={chillMusic?.data ? chillMusic.data : []} title={"Top chills"}/>
			<MainSlider data={workoutMusic?.data ? workoutMusic.data : []} title={"Top workout"}/>
			<MainSlider data={partyMusic?.data ? partyMusic.data : []} title={"Top party"}/>
		</Container>
	);
}

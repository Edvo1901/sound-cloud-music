import WaveTrack from "@/components/track/WaveTrack";
import { sendRequest } from "@/utils/API";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";

const DetailTrackPage = async (props: any) => {
	const {params} = props

	const res = await sendRequest<IBackendRes<ITrackTop>>({
		url: `http://localhost:8000/api/v1/tracks/${params.slug}`,
		method: "GET",
	});

	return (
		<Container>
			<div>
				<WaveTrack track={res?.data ?? null}/>
			</div>
		</Container>
	);
};

export default DetailTrackPage;

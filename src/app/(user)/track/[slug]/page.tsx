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

	const comments = await sendRequest<IBackendRes<IModelPaginate<IComments>>>({
		url: `http://localhost:8000/api/v1/tracks/comments`,
		method: "POST",
		queryParams: {
			current: 1,
			pageSize: 10,
			trackId: params.slug,
			sort: "-createAt"
		}
	});

	return (
		<Container>
			<div>
				<WaveTrack track={res?.data ?? null} commentList={comments?.data?.result ?? []}/>
			</div>
		</Container>
	);
};

export default DetailTrackPage;

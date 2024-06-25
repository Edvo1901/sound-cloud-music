import WaveTrack from "@/components/track/WaveTrack";
import { sendRequest } from "@/utils/API";
import { Container } from "@mui/material";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

type Props = {
	params: { slug: string };
};

export async function generateMetadata(
	{ params }: Props,
	parent: ResolvingMetadata
): Promise<Metadata> {
	const temp = params.slug.split(".html");
	const splitTemp = temp[0]?.split("-");
	const id = splitTemp[splitTemp.length - 1];

	// fetch data
	const res = await sendRequest<IBackendRes<ITrackTop>>({
		url: `http://localhost:8000/api/v1/tracks/${id}`,
		method: "GET",
		nextOption: { cache: "no-store" },
	});

	return {
		title: res.data?.title,
		description: res.data?.description,
		openGraph: {
			title: "Website music",
			description: "Clone from Sound cloud",
			type: "website",
			images: [
				`https://raw.githubusercontent.com/haryphamdev/sharing-host-files/master/detail-doctors/a1.jpg`,
			],
		},
	};
}

const DetailTrackPage = async (props: any) => {
	const { params } = props;

	const temp = params.slug.split(".html");
	const splitTemp = temp[0]?.split("-");
	const id = splitTemp[splitTemp.length - 1];

	const res = await sendRequest<IBackendRes<ITrackTop>>({
		url: `http://localhost:8000/api/v1/tracks/${id}`,
		method: "GET",
		nextOption: { cache: "no-store" },
	});

	const comments = await sendRequest<IBackendRes<IModelPaginate<IComments>>>({
		url: `http://localhost:8000/api/v1/tracks/comments`,
		method: "POST",
		queryParams: {
			current: 1,
			pageSize: 10,
			trackId: id,
			sort: "-createAt",
		},
	});

	if (!res.data) return notFound();
	await new Promise(resolve => setTimeout(resolve, 3000))
	return (
		<Container>
			<div>
				<WaveTrack
					track={res?.data ?? null}
					commentList={comments?.data?.result ?? []}
				/>
			</div>
		</Container>
	);
};

export default DetailTrackPage;

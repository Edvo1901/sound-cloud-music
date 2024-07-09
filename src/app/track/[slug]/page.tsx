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
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
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

export async function generateStaticParams() {
	return [
		{ slug: "khi-con-mo-dan-phai-664f5b2205f94dc2241189f2.html" },
		{ slug: "nu-hon-bisou-664f5b2205f94dc2241189f0.html" },
		{ slug: "tinh-co-yeu-em-664f5b2205f94dc2241189f6.html" },
	];
}

const DetailTrackPage = async (props: any) => {
	const { params } = props;

	const temp = params.slug.split(".html");
	const splitTemp = temp[0]?.split("-");
	const id = splitTemp[splitTemp.length - 1];

	const res = await sendRequest<IBackendRes<ITrackTop>>({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/${id}`,
		method: "GET",
		nextOption: {
			//cache: "no-store",
			next: { tags: ["track-by-id"] },
		},
	});

	const comments = await sendRequest<IBackendRes<IModelPaginate<IComments>>>({
		url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/comments`,
		method: "POST",
		queryParams: {
			current: 1,
			pageSize: 10,
			trackId: id,
			sort: "-createAt",
		},
	});

	if (!res.data) return notFound();

	await new Promise((resolve) => setTimeout(resolve, 3000));

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

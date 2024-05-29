"use client"

import WaveTrack from "@/components/track/WaveTrack";
import { Container } from "@mui/material";
import { useSearchParams } from "next/navigation";

const DetailTrackPage = (props: any) => {
	const {params} = props
	const searchParams = useSearchParams()
	const search = searchParams.get("audio")

	return (
		<Container>
			Detail track {params.slug}
			<div>
				<WaveTrack />
			</div>
		</Container>
	);
};

export default DetailTrackPage;

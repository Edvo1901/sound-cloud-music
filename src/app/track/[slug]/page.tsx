"use client"

import WaveTrack from "@/components/track/WaveTrack";
import { useSearchParams } from "next/navigation";

const DetailTrackPage = (props: any) => {
	const {params} = props
	const searchParams = useSearchParams()
	const search = searchParams.get("audio")

	return (
		<div>
			Detail track {params.slug}
			<div>
				<WaveTrack />
			</div>
		</div>
	);
};

export default DetailTrackPage;

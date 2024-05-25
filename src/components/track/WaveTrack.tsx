"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWaveSurfer } from "@/utils/CustomHook";

const WaveTrack = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const fileName = searchParams.get("audio");
	const optionMemo = useMemo(() => {
		return {
			waveColor: "rgb(200, 0, 200)",
			progressColor: "rgb(100, 0, 100)",
			url: `/api?audio=${fileName}`,
		};
	}, []);
	const ws = useWaveSurfer(containerRef, optionMemo);
	const [isPlaying, setIsPlaying] = useState<boolean | undefined>(false);

	useEffect(() => {
		if (!ws) return;
		setIsPlaying(false);

		const subscriptions = [
			ws?.on("play", () => setIsPlaying(true)),
			ws?.on("pause", () => setIsPlaying(false)),
		];
		return () => {
			subscriptions.forEach((unsub) => unsub());
		};
	}, [ws]);

	const onPlayClick = useCallback(() => {
		if (ws) {
			ws.isPlaying() ? ws.pause() : ws.play();
		}
	}, [ws]);

	return (
		<div>
			<div ref={containerRef}>Wave</div>
			<button onClick={() => onPlayClick()}>{isPlaying ? "Pause" : "Play"}</button>
		</div>
	);
};

export default WaveTrack;

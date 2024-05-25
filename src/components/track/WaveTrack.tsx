"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWaveSurfer } from "@/utils/CustomHook";
import { WaveSurferOptions } from "wavesurfer.js";
import "./WaveTrack.scss";

const WaveTrack = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const fileName = searchParams.get("audio");
	const optionMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
		const canvas = document.createElement("canvas")!;
		const ctx = canvas.getContext("2d")!;

		// Define the waveform gradient
		const gradient = ctx.createLinearGradient(
			0,
			0,
			0,
			canvas.height * 1.35
		);
		gradient.addColorStop(0, "#656666"); // Top color
		gradient.addColorStop((canvas.height * 0.7) / canvas.height, "#656666"); // Top color
		gradient.addColorStop(
			(canvas.height * 0.7 + 1) / canvas.height,
			"#ffffff"
		); // White line
		gradient.addColorStop(
			(canvas.height * 0.7 + 2) / canvas.height,
			"#ffffff"
		); // White line
		gradient.addColorStop(
			(canvas.height * 0.7 + 3) / canvas.height,
			"#B1B1B1"
		); // Bottom color
		gradient.addColorStop(1, "#B1B1B1"); // Bottom color

		// Define the progress gradient
		const progressGradient = ctx.createLinearGradient(
			0,
			0,
			0,
			canvas.height * 1.35
		);
		progressGradient.addColorStop(0, "#EE772F"); // Top color
		progressGradient.addColorStop(
			(canvas.height * 0.7) / canvas.height,
			"#EB4926"
		); // Top color
		progressGradient.addColorStop(
			(canvas.height * 0.7 + 1) / canvas.height,
			"#ffffff"
		); // White line
		progressGradient.addColorStop(
			(canvas.height * 0.7 + 2) / canvas.height,
			"#ffffff"
		); // White line
		progressGradient.addColorStop(
			(canvas.height * 0.7 + 3) / canvas.height,
			"#F6B094"
		); // Bottom color
		progressGradient.addColorStop(1, "#F6B094"); // Bottom color
		return {
			waveColor: gradient,
			progressColor: "orange",
			barWidth: 2,
			url: `/api?audio=${fileName}`,
		};
	}, []);

	const ws = useWaveSurfer(containerRef, optionMemo);
	const [isPlaying, setIsPlaying] = useState<boolean | undefined>(false);

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secondsRemainder = Math.round(seconds) % 60;
		const paddedSeconds = `0${secondsRemainder}`.slice(-2);
		return `${minutes}:${paddedSeconds}`;
	};



	useEffect(() => {
		if (!ws) return;
		setIsPlaying(false);

		const timeEl = document.querySelector("#time")!;
		const durationEl = document.querySelector("#duration")!;

		const subscriptions = [
			ws?.on("play", () => setIsPlaying(true)),
			ws?.on("pause", () => setIsPlaying(false)),
			ws?.on(
				"decode",
				(duration) => (durationEl.textContent = formatTime(duration))
			),
			ws?.on(
				"timeupdate",
				(currentTime) => (timeEl.textContent = formatTime(currentTime))
			),
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
			<div ref={containerRef} className="wave-form-container">
				Wave
				<div id="time">0:00</div>
				<div id="duration">0:00</div>
			</div>

			<button onClick={() => onPlayClick()}>
				{isPlaying ? "Pause" : "Play"}
			</button>
		</div>
	);
};

export default WaveTrack;

"use client";

import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useWaveSurfer } from "@/utils/CustomHook";
import { WaveSurferOptions } from "wavesurfer.js";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import "./WaveTrack.scss";
import { relative } from "path";

const WaveTrack = () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const hoverRef = useRef<HTMLDivElement>(null);
	const searchParams = useSearchParams();
	const fileName = searchParams.get("audio");
	const [time, setTime] = useState<string>("0:00");
	const [duration, setDuration] = useState<string>("0:00");

	const optionMemo = useMemo((): Omit<WaveSurferOptions, "container"> => {
		const canvas = document.createElement("canvas")!;
		const ctx = canvas.getContext("2d")!;
		let gradient, progressGradient;

		if (typeof window !== "undefined") {
			// Define the waveform gradient
			gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 1.35);
			gradient.addColorStop(0, "#656666"); // Top color
			gradient.addColorStop(
				(canvas.height * 0.7) / canvas.height,
				"#656666"
			); // Top color
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
			progressGradient = ctx.createLinearGradient(
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
		}

		return {
			waveColor: gradient,
			progressColor: "orange",
			barWidth: 3,
			height: 100,
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

		const hover = hoverRef.current!;
		const waveForm = containerRef.current!;
		//@ts-ignore
		waveForm?.addEventListener(
			"pointermove",
			(e) => (hover.style.width = `${e.offsetX}px`)
		);

		const subscriptions = [
			ws?.on("play", () => setIsPlaying(true)),
			ws?.on("pause", () => setIsPlaying(false)),
			ws?.on("decode", (duration) => {
				setDuration(formatTime(duration));
			}),
			ws?.on("timeupdate", (currentTime) => {
				setTime(formatTime(currentTime));
			}),
			// ws?.once("interaction", () => {
			// 	ws.play()
			// })
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

	const arrComments = [
		{
			id: 1,
			avatar: "http://localhost:8000/images/chill1.png",
			moment: 10,
			user: "username 1",
			content: "just a comment1",
		},
		{
			id: 2,
			avatar: "http://localhost:8000/images/chill1.png",
			moment: 30,
			user: "username 2",
			content: "just a comment3",
		},
		{
			id: 3,
			avatar: "http://localhost:8000/images/chill1.png",
			moment: 50,
			user: "username 3",
			content: "just a comment3",
		},
	];

	const calAvtPosition = (moment: number) => {
		const defaultDuration = 199;
		const percent = (moment / defaultDuration) * 100;
		return `${percent}%`;
	};

	return (
		<div className="wave-track-container">
			<div
				style={{
					display: "flex",
					gap: 15,
					padding: 20,
					height: 400,
					background:
						"linear-gradient(135deg, rgb(106, 112, 67) 0%, rgb(11, 15, 20) 100%)",
				}}
			>
				<div
					className="left"
					style={{
						width: "75%",
						height: "calc(100% - 10px)",
						display: "flex",
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<div className="info" style={{ display: "flex" }}>
						<div>
							<div
								onClick={() => onPlayClick()}
								style={{
									borderRadius: "50%",
									background: "#f50",
									height: "50px",
									width: "50px",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									cursor: "pointer",
								}}
							>
								{isPlaying === true ? (
									<PauseIcon
										sx={{ fontSize: 30, color: "white" }}
									/>
								) : (
									<PlayArrowIcon
										sx={{ fontSize: 30, color: "white" }}
									/>
								)}
							</div>
						</div>
						<div style={{ marginLeft: 20 }}>
							<div
								style={{
									padding: "0 5px",
									background: "#333",
									fontSize: 30,
									width: "fit-content",
									color: "white",
								}}
							>
								This is a song
							</div>
							<div
								style={{
									padding: "0 5px",
									marginTop: 10,
									background: "#333",
									fontSize: 20,
									width: "fit-content",
									color: "white",
								}}
							>
								Good song
							</div>
						</div>
					</div>
					<div ref={containerRef} className="wave-form-container">
						<div className="time">{time}</div>
						<div className="duration">{duration}</div>
						<div ref={hoverRef} className="hover-wave"></div>
						<div
							className="overlay"
							style={{
								position: "absolute",
								height: "30px",
								width: "100%",
								bottom: "0",
								backdropFilter: "brightness(0.5)",
							}}
						></div>
						<div className="comments" style={{position: "relative"}}>
							{arrComments.map((item) => {
								return (
									<img
										key={item.id}
										style={{
											height: 20,
											width: 20,
											position: "absolute",
											top: 71,
											zIndex: 20,
											left: calAvtPosition(item.moment)
										}}
										src={`http://localhost:8000/images/chill1.png`}
									/>
								);
							})}
						</div>
					</div>
				</div>
				<div
					className="right"
					style={{
						width: "25%",
						padding: 15,
						display: "flex",
						alignItems: "center",
					}}
				>
					<div
						style={{
							background: "#ccc",
							width: 250,
							height: 250,
						}}
					></div>
				</div>
			</div>
		</div>
	);
};

export default WaveTrack;

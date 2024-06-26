"use client";
import { TrackContext, useTrackContext } from "@/lib/TrackWrapper";
import { useHasMounted } from "@/utils/CustomHook";
import { AppBar, Container } from "@mui/material";
import { useContext, useEffect, useRef } from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
	const hasMounted = useHasMounted();
	const { currentTrack, setCurrentTrack } =
		useTrackContext() as ITrackContext;
	const playerRef = useRef(null);

	useEffect(() => {
		//@ts-ignore
		if (currentTrack?.isPlaying) {
			//@ts-ignore
			playerRef?.current?.audio?.current?.play();
		} else {
			//@ts-ignore
			playerRef?.current?.audio?.current?.pause();
		}
	}, [currentTrack]);

	if (!hasMounted) return <></>;

	return (
		<>
			{currentTrack._id && (
				<div style={{ marginTop: 50 }}>
					<AppBar
						position="fixed"
						sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
					>
						<Container
							sx={{
								display: "flex",
								gap: 10,
								".rhap_main": {
									gap: "30px",
								},
							}}
						>
							<AudioPlayer
								ref={playerRef}
								layout="horizontal-reverse"
								autoPlay={false}
								src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${currentTrack.trackUrl}`}
								style={{
									boxShadow: "unset",
									background: "#f2f2f2",
								}}
								onPlay={() => {
									setCurrentTrack({
										...currentTrack,
										isPlaying: true,
									});
								}}
								onPause={() => {
									setCurrentTrack({
										...currentTrack,
										isPlaying: false,
									});
								}}
							/>
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									alignItems: "start",
									justifyContent: "center",
									minWidth: 100,
								}}
							>
								<div style={{ color: "#ccc" }}>
									{currentTrack.description}
								</div>
								<div style={{ color: "black" }}>
									{currentTrack.title}
								</div>
							</div>
						</Container>
					</AppBar>
				</div>
			)}
		</>
	);
};

export default AppFooter;

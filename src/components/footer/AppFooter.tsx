"use client";
import { useHasMounted } from "@/utils/CustomHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

const AppFooter = () => {
	const hasMounted = useHasMounted();

	if (!hasMounted) return <></>;

	return (
		<div>
			<AppBar
				position="fixed"
				sx={{ top: "auto", bottom: 0, background: "#f2f2f2" }}
			>
				<Container sx={{ display: "flex", gap: 10 }}>
					<AudioPlayer
						autoPlay={false}
						src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/hoidanit.mp3`}
						style={{
							boxShadow: "unset",
							background: "#f2f2f2",
						}}
						// other props here
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
						<div style={{ color: "#ccc" }}>Maybe</div>
						<div style={{ color: "black" }}>The song</div>
					</div>
				</Container>
			</AppBar>
		</div>
	);
};

export default AppFooter;

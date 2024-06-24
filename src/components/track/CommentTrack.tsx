"use client";
import { fetchDefaultImage, sendRequest } from "@/utils/API";
import { Box, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import WaveSurfer from "wavesurfer.js";
import { useHasMounted } from "@/utils/CustomHook";
dayjs.extend(relativeTime);

interface IProps {
	comments: IComments[];
	track: ITrackTop | null;
	ws: WaveSurfer | null;
}

const CommentTrack = (props: IProps) => {
	const router = useRouter();
	const hasMounted = useHasMounted();

	const { comments, track, ws } = props;
	const [yourComment, setYourComment] = useState("");
	const { data: session } = useSession();

	const formatTime = (seconds: number) => {
		const minutes = Math.floor(seconds / 60);
		const secondsRemainder = Math.round(seconds) % 60;
		const paddedSeconds = `0${secondsRemainder}`.slice(-2);
		return `${minutes}:${paddedSeconds}`;
	};

	const handleSubmit = async () => {
		const res = await sendRequest<IBackendRes<IComments>>({
			url: `http://localhost:8000/api/v1/comments`,
			method: "POST",
			body: {
				content: yourComment,
				moment: Math.round(ws?.getCurrentTime() ?? 0),
				track: track?._id,
			},

			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
		});
		if (res.data) {
			setYourComment("");
			router.refresh();
		}
	};

	return (
		<div>
			<div style={{ marginTop: "50px", marginBottom: "25px" }}>
				{session?.user && (
					<TextField
						value={yourComment}
						onChange={(e) => setYourComment(e.target.value)}
						fullWidth
						label="Comments"
						variant="standard"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								handleSubmit();
							}
						}}
					/>
				)}
			</div>
			<div style={{ display: "flex", gap: "10px" }}>
				<div className="left" style={{ width: "190px" }}>
					<img
						style={{
							height: 150,
							width: 150,
						}}
						src={fetchDefaultImage(track?.uploader?.type!)}
					/>
					<div>{track?.uploader?.email}</div>
				</div>
				<div className="right" style={{ width: "calc(100% - 200px)" }}>
					{comments.map((comment) => {
						return (
							<Box
								key={comment._id}
								sx={{
									display: "flex",
									gap: "10px",
									justifyContent: "space-between",
								}}
							>
								<Box
									sx={{
										display: "flex",
										gap: "10px",
										marginBottom: "25px",
										alignItems: "center",
									}}
								>
									<img
										style={{
											height: 40,
											width: 40,
										}}
										src={fetchDefaultImage(
											comment.user.type
										)}
									/>
									<div>
										<div style={{ fontSize: "13px" }}>
											{comment?.user?.name ??
												comment?.user?.email}{" "}
											at {formatTime(comment.moment)}
										</div>
										<div>{comment.content}</div>
									</div>
								</Box>
								<div
									style={{ fontSize: "12px", color: "#999" }}
								>
									{hasMounted &&
										dayjs(comment.createdAt).fromNow()}
								</div>
							</Box>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default CommentTrack;

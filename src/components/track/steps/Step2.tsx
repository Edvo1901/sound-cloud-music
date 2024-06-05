import LinearProgress, {
	LinearProgressProps,
} from "@mui/material/LinearProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "next-auth/react";
import axios from "axios";
import { sendRequest } from "@/utils/API";
import { useToast } from "@/utils/toast";

function LinearProgressWithLabel(
	props: LinearProgressProps & { value: number }
) {
	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Box sx={{ width: "100%", mr: 1 }}>
				<LinearProgress variant="determinate" {...props} />
			</Box>
			<Box sx={{ minWidth: 35 }}>
				<Typography
					variant="body2"
					color="text.secondary"
				>{`${Math.round(props.value)}%`}</Typography>
			</Box>
		</Box>
	);
}

const VisuallyHiddenInput = styled("input")({
	clip: "rect(0 0 0 0)",
	clipPath: "inset(50%)",
	height: 1,
	overflow: "hidden",
	position: "absolute",
	bottom: 0,
	left: 0,
	whiteSpace: "nowrap",
	width: 1,
});

const musicCategory = [
	{
		value: "CHILL",
		label: "CHILL",
	},
	{
		value: "WORKOUT",
		label: "WORKOUT",
	},
	{
		value: "PARTY",
		label: "PARTY",
	},
];

interface IProps {
	trackUpload: {
		fileName: string;
		percent: number;
		uploadedTrackName: string;
	},
	setValue: (v: number) => void
}

interface INewTrack {
	title: string;
	description: string;
	trackUrl: string;
	imageUrl: string;
	category: string;
}

const Step2 = (props: IProps) => {
	const { trackUpload, setValue } = props;
	const toast = useToast();
	const { data: session } = useSession<boolean>();
	const [info, setInfo] = useState<INewTrack>({
		title: "",
		description: "",
		trackUrl: "",
		imageUrl: "",
		category: "",
	});

	const handleImageFileUpload = async (e: React.SyntheticEvent | Event) => {
		const event = e.target as HTMLInputElement;
		if (event.files) {
			const formData = new FormData();
			formData.append("fileUpload", event.files[0]);

			try {
				const res = await axios.post(
					"http://localhost:8000/api/v1/files/upload",
					formData,
					{
						headers: {
							Authorization: `Bearer ${session?.access_token}`,
							target_type: "images",
						},
					}
				);
				setInfo({
					...info,
					imageUrl: res.data.data.fileName,
				});
			} catch (err) {
				//@ts-ignore
				toast.error(err?.response?.data?.message);
			}
		}
	};

	const handleSubmitForm = async () => {
		const res = await sendRequest<IBackendRes<ITrackTop[]>>({
			url: "http://localhost:8000/api/v1/tracks",
			headers: {
				Authorization: `Bearer ${session?.access_token}`,
			},
			method: "POST",
			body: {
				title: info.title,
				description: info.description,
				trackUrl: info.trackUrl,
				imgUrl: info.imageUrl,
				category: info.category,
			},
		});

		if (res.data) {
			setValue(0)
			toast.success(res.message);
		} else {
			toast.error(res.message);
		}
	};

	useEffect(() => {
		if (trackUpload && trackUpload.uploadedTrackName) {
			setInfo({
				...info,
				trackUrl: trackUpload.uploadedTrackName,
			});
		}
	}, [trackUpload]);

	return (
		<div>
			<div>{trackUpload.fileName}</div>
			<Box sx={{ width: "100%" }}>
				<LinearProgressWithLabel value={trackUpload.percent} />
			</Box>
			<Box sx={{ flexGrow: 1 }}>
				<Grid container spacing={2}>
					<Grid
						item
						xs={6}
						md={4}
						sx={{
							display: "flex",
							justifyContent: "center",
							alignItems: "center",
							flexDirection: "column",
							gap: "10px",
						}}
					>
						<div
							style={{
								height: 250,
								width: 250,
								background: "#ccc",
							}}
						>
							<div>
								{info.imageUrl && (
									<img
										height={250}
										width={250}
										src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${info.imageUrl}`}
									/>
								)}
							</div>
						</div>
						<Button
							component="label"
							role={undefined}
							variant="contained"
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
							onChange={(e) => handleImageFileUpload(e)}
						>
							Upload file
							<VisuallyHiddenInput type="file" />
						</Button>
					</Grid>
					<Grid item xs={6} md={8}>
						<Box
							component="form"
							sx={{
								"& > :not(style)": { m: 1 },
							}}
							noValidate
							autoComplete="off"
						>
							<TextField
								value={info?.title}
								onChange={(e) =>
									setInfo({
										...info,
										title: e.target.value,
									})
								}
								label="Title"
								variant="standard"
								fullWidth
								margin="dense"
							/>
							<TextField
								value={info.description}
								onChange={(e) =>
									setInfo({
										...info,
										description: e.target.value,
									})
								}
								label="Description"
								variant="standard"
								fullWidth
								margin="dense"
							/>
							<TextField
								value={info.category}
								onChange={(e) =>
									setInfo({
										...info,
										category: e.target.value,
									})
								}
								select
								label="Category"
								defaultValue="CHILL"
								helperText="Please select your music category"
								variant="standard"
								fullWidth
								margin="dense"
							>
								{musicCategory.map((option) => (
									<MenuItem
										key={option.value}
										value={option.value}
									>
										{option.label}
									</MenuItem>
								))}
							</TextField>
							<Button
								variant="outlined"
								onClick={() => handleSubmitForm()}
							>
								Save
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default Step2;

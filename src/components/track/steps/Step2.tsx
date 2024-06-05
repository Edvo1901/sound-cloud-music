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
		value: "chillMusic",
		label: "CHILL",
	},
	{
		value: "workoutMusic",
		label: "WORKOUT",
	},
	{
		value: "partyMusic",
		label: "PARTY",
	},
];

interface IProps {
	trackUpload: {
		fileName: string;
		percent: number;
	};
}

const Step2 = (props: IProps) => {
	const { trackUpload } = props;

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
							<div></div>
						</div>
						<Button
							component="label"
							role={undefined}
							variant="contained"
							tabIndex={-1}
							startIcon={<CloudUploadIcon />}
							onClick={(e) => e.preventDefault()}
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
								id="title-input"
								label="Title"
								variant="standard"
								fullWidth
								margin="dense"
							/>
							<TextField
								id="description-input"
								label="Description"
								variant="standard"
								fullWidth
								margin="dense"
							/>
							<TextField
								id="music-category"
								select
								label="Category"
								defaultValue="chillMusic"
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
							<Button variant="outlined">Save</Button>
						</Box>
					</Grid>
				</Grid>
			</Box>
		</div>
	);
};

export default Step2;

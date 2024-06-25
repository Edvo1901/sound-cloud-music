"use client";
import { sendRequestFile } from "@/utils/API";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import "./Step1.scss";

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

interface IProps {
	setValue: (v:number) => void;
	setTrackUpload: any,
	trackUpload: any
}

const Step1 = (props: IProps) => {
	const {setValue, setTrackUpload, trackUpload} = props
	const [percent, setPercent] = useState<number>(0)
	const { data: session } = useSession<boolean>();

	const onDrop = useCallback(
		async (acceptedFiles: FileWithPath[]) => {
			if (acceptedFiles && acceptedFiles[0]) {
				setValue(1)
				const audio = acceptedFiles[0];
				const formData = new FormData();
				formData.append("fileUpload", audio);

				// const chillMusic = await sendRequestFile<IBackendRes<ITrackTop[]>>({
				// 	url: "${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload",
				// 	headers: {
				// 		"Authorization": `Bearer ${session?.access_token}`,
				// 		"target_type": "tracks"
				// 	},
				// 	method: "POST",
				// 	body: formData,
				// });

				try {
					const res = await axios.post(
						`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/files/upload`,
						formData,
						{
							headers: {
								Authorization: `Bearer ${session?.access_token}`,
								target_type: "tracks",
							},
							onUploadProgress: (progressEvent) => {

								let percentCompleted = Math.floor(
									(progressEvent.loaded * 100) /
										progressEvent.total!
								);
								setPercent(percentCompleted)
								setTrackUpload({
									...trackUpload,
									fileName: acceptedFiles[0].name,
									percent: percentCompleted
								})
							},
						}
					);
					setTrackUpload((prevState: any) => ({
						...prevState,
						uploadedTrackName: res.data.data.fileName
					}))
				} catch (err) {
					//@ts-ignore
					alert(err?.response?.data);
				}
			}
		},
		[session]
	);

	const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: { "audio/*": [".mp3", ".m4a", ".wav"] },
	});

	const files = acceptedFiles.map((file: FileWithPath) => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	return (
		<section className="container">
			<div {...getRootProps({ className: "dropzone" })}>
				<input {...getInputProps()} />
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
				<p>Drag 'n' drop some files here, or click to select files</p>
			</div>
			<aside>
				<h4>Files</h4>
				<ul>{files}</ul>
			</aside>
		</section>
	);
};

export default Step1;

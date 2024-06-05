"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import { SyntheticEvent, useState } from "react";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function CustomTabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

interface ITrackUpload {
	fileName: string,
	percent: number,
	uploadedTrackName: ""
}

const UploadTab = () => {
	const [value, setValue] = useState<number>(0);
	const [trackUpload, setTrackUpload] = useState<ITrackUpload>({
		fileName: "",
		percent: 0,
		uploadedTrackName: ""
	})

	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	return (
		<Box sx={{ width: "100%", border: "1px solid #ccc" }}>
			<Box sx={{ borderBottom: 1, borderColor: "divider" }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label="basic tabs example"
				>
					<Tab label="Upload file" {...a11yProps(0)} />
					<Tab label="Information" {...a11yProps(1)} />
				</Tabs>
			</Box>
			<CustomTabPanel value={value} index={0}>
				<Step1 setValue={setValue} setTrackUpload={setTrackUpload} trackUpload={trackUpload}/>
			</CustomTabPanel>
			<CustomTabPanel value={value} index={1}>
				<Step2 trackUpload={trackUpload}/>
			</CustomTabPanel>
		</Box>
	);
};

export default UploadTab;

"use client"
import UploadTab from "@/components/track/UploadTab";
import { Container } from "@mui/material";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Upload new track',
    description: 'new track upload page',
}

const UploadPage = () => {
	return (
		<Container>
			<UploadTab />
		</Container>
	)
}

export default UploadPage;

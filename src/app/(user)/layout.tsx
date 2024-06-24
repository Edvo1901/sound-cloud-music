import AppFooter from "@/components/footer/AppFooter";
import SearchBar from "@/components/header/SearchBar";
import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Layout title",
	description: "Layout description",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SearchBar />
			{children}
			<div style={{ marginBottom: "100px" }}></div>
			<AppFooter />
		</>
	);
}

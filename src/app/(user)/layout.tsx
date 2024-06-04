import AppFooter from "@/components/footer/AppFooter";
import SearchBar from "@/components/header/SearchBar";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SearchBar />
			{children}
			<AppFooter />
		</>
	);
}
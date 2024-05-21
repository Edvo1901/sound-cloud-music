import SearchBar from "@/components/header/SearchBar";
import ThemeRegistry from "@/components/theme-registry/theme.registry";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<SearchBar />
					{children}
				</ThemeRegistry>
			</body>
		</html>
	);
}

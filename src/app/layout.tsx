import AppFooter from "@/components/footer/AppFooter";
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
					<AppFooter />
				</ThemeRegistry>
			</body>
		</html>
	);
}

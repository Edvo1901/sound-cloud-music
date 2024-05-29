import AppFooter from "@/components/footer/AppFooter";
import SearchBar from "@/components/header/SearchBar";
import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/NextAuthProvider";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<ThemeRegistry>
					<NextAuthProvider>
						<SearchBar />
						{children}
						<AppFooter />
					</NextAuthProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}

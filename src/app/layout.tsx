import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/NextAuthProvider";
import { TrackContextProvider } from "@/lib/TrackWrapper";
import { ToastProvider } from "@/utils/toast";

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
						<ToastProvider>
							<TrackContextProvider>
								{children}
							</TrackContextProvider>
						</ToastProvider>
					</NextAuthProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}

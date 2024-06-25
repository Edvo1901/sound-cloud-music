import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/NextAuthProvider";
import NProgressWrapper from "@/lib/NProgressWrapper";
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
					<NProgressWrapper>
						<NextAuthProvider>
							<ToastProvider>
								<TrackContextProvider>
									{children}
								</TrackContextProvider>
							</ToastProvider>
						</NextAuthProvider>
					</NProgressWrapper>
				</ThemeRegistry>
			</body>
		</html>
	);
}

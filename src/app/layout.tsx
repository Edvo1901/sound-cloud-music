import ThemeRegistry from "@/components/theme-registry/theme.registry";
import NextAuthProvider from "@/lib/NextAuthProvider";
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
						<ToastProvider>{children}</ToastProvider>
					</NextAuthProvider>
				</ThemeRegistry>
			</body>
		</html>
	);
}

import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "@/providers/react-query-provider";
import NextTopLoader from "nextjs-toploader";
import { ToasterProvider } from "@/providers/toast-provider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins"
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={poppins.variable}>
        <NextTopLoader
          showSpinner={false}
          color="#2563EB"
        />
        <ToasterProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

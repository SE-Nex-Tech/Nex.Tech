import { Inter } from "next/font/google";
import "./globals.scss";
import Sidebar from "@/_components/sideNav/Sidebar";
import { Providers } from "./providers/providers";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import Header from "@/_components/header/Header";
import { usePathname, useRouter } from "next/navigation";
import { ModalsProvider } from "@mantine/modals";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BiblioTechAI Portal",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <div className="row">
          <MantineProvider>
            <ModalsProvider>
              <Providers>
                {<Sidebar />}
                <div className="body">
                  <div className="container">{children}</div>
                </div>
              </Providers>
            </ModalsProvider>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}

import { Inter } from "next/font/google";
import "./globals.scss";
import { Providers } from "./providers/providers";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import Header from "@/_components/superadmin/header";

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
                <div className="body">
                  <Header />
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

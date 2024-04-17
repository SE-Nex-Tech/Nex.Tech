import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "../(general)/providers/providers";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";

const plusjakartasans = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Login | Bibliotechai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={plusjakartasans.className}>
        <div className="row">
          <MantineProvider>
            <Providers>
              <div className="container">{children}</div>
            </Providers>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}

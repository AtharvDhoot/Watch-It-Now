import "./globals.css";
import { Montserrat } from "next/font/google";
import { Constants } from "@/lib/Constans";
import Navbar from "@/components/Navbar";
import { Providers } from "./providers";
import Footer from "@/components/Footer";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Watch It Now",
  description: "A recommendation system",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={`${montserrat.className} text-base-content`}>
        <Providers>
          <Navbar
            title={{ label: Constants.fullName, route: "/" }}
            navItems={[
              { label: "Home", route: "/" },
              {
                label: Constants.suggestionsLabel,
                route: Constants.suggestionsLink,
              },
              {
                label: Constants.watchLaterLabel,
                route: Constants.watchLaterLink,
              },
            ]}
          />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

import React from "react";
import type { Metadata } from "next";
import "./css/globals.css";
import { Flowbite, ThemeModeScript } from "flowbite-react";
import customTheme from "@/utils/theme/custom-theme";


export const metadata: Metadata = {
  title: "NextKit - Prisma Orm",
  description: "NextKit is a backend template powered by mongodb , sqlite and Prisma orm",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (

    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <ThemeModeScript />
      </head>
      <body>
        <Flowbite theme={{ theme: customTheme }}>
            {children}
        </Flowbite>
      </body>
    </html>

  );
}




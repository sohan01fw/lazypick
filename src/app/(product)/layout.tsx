import { AI } from "@/lib/ai";
import { SWRProvider } from "@/lib/config/swr-config/swr-provider";
import React from "react";

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <AI>
      <html lang="en">
        <body>
          <SWRProvider>{children}</SWRProvider>
        </body>
      </html>
    </AI>
  );
}

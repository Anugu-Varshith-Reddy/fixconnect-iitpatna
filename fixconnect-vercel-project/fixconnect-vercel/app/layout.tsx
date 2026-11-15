import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FixConnect | Campus repair, without the runaround",
  description: "Find trusted repair support around IIT Patna hostels with FixConnect."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
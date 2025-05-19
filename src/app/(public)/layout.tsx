import { Footer } from "@/components/common/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "myVoice",
  description: "myVoice - Your Voice Matters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full">
      {children}
      <Footer />
    </div>
  );
}

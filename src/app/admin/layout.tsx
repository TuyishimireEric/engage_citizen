import SidebarMenu from "@/components/common/SideNav";
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
    <div className="flex z-20 h-screen max-h-[90vh] w-full p-0 relative">
      <SidebarMenu />
      <div className="max-h-full flex-grow h-full bg-gray-50 dark:bg-gray-800 shadow-inner rounded-tl-3xl py-2 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

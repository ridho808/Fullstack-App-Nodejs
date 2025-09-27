import "@/styles/globals.css";
import SideBar from "@/src/components/sideBar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-[85vh]">
      <main className="container mx-auto max-w-7xl px-4 flex gap-4 flex-grow">
        <SideBar />
        {children}
      </main>
    </div>
  );
}

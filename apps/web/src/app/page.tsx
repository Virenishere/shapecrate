import Navbar from "@/components/common/Navbar";
import Landing from "@/components/landing/Landing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="px-44 min-h-screen bg-[#fbfbfa]  border-amber-500 border-4">
      <Navbar />
            {/* <Image
              className="dark:invert h-[14px] w-4"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={14}
            /> */}

      <Landing />
    </main>
  );
}

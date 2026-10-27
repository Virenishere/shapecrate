import Footer from "@/components/common/Footer";
import Navbar from "@/components/common/Navbar";
import Landing from "@/components/landing/Landing";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-(--bg) transition-colors">
      {/* <Navbar /> */}
      <Landing />
      {/* <Footer /> */}
    </main>
  );
}

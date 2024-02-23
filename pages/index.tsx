import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`w-screen min-h-screen ${inter.className}`}>
      Hello world
    </main>
  );
}

import Link from "next/link";
import { TiHome } from "react-icons/ti";
import { FiLogIn } from "react-icons/fi";
import { MdMenuBook } from "react-icons/md";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import { useAuth } from "@/context";
import { FaUser } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { pathname } = router;
  const { currentUser, handleLogout } = useAuth();

  return (
    <div
      className={`w-[100%] min-h-screen flex bg-cyan-400 text-white ${inter.className}`}
    >
      <nav className="w-[300px] h-auto py-1">
        <ul className="w-full h-full flex flex-col items-start justify-start gap-1">
          <li className="w-full h-auto py-1 text-center  text-sm font-semibold">
            <Link
              href={"/"}
              className="flex justify-center items-center gap-1 text-slate-800 text-base"
            >
              <TiHome size={18} /> Home{" "}
            </Link>
          </li>
          {currentUser ? (
            <div className="flex flex-col w-full h-auto gap-2 p-2">
              <div className="flex justify-start items-center gap-1 text-sm font-medium text-black">
                <FaUser size={14} /> {currentUser.name}
              </div>
              <button
                onClick={handleLogout}
                type="button"
                className="w-full h-[36px] mt-4 rounded-md text-black font-medium capitalize shadow bg-cyan-300 text-sm hover:opacity-75 transition"
              >
                logout
              </button>
            </div>
          ) : (
            <>
              <li
                className={`w-full h-auto py-2 text-center text-sm font-semibold border-b  hover:bg-white hover:text-cyan-400 transition ${
                  pathname == "/login"
                    ? "bg-white text-cyan-400"
                    : "bg-none text-white"
                }`}
              >
                <Link
                  href={"/login"}
                  className="flex justify-start items-center gap-1 px-2 text-sm"
                >
                  {" "}
                  <FiLogIn size={16} /> Login
                </Link>
              </li>
              <li
                className={`w-full h-auto py-2 text-center text-sm font-semibold border-b hover:bg-white hover:text-cyan-400 transition ${
                  pathname == "/register"
                    ? "bg-white text-cyan-400"
                    : "bg-none text-white"
                }`}
              >
                <Link
                  href={"/register"}
                  className="flex justify-start items-center gap-1 px-2 text-sm"
                >
                  {" "}
                  <FiLogIn size={16} /> Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <div className="w-full h-auto grow rounded-md my-1 mr-1 bg-white text-black py-1 px-2">
        {children}
      </div>
    </div>
  );
}

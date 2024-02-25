import Layout from "@/components/layout";
import { useAuth } from "@/context";
import { setItems } from "@/helper/localstorage";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";
import { BeatLoader } from "react-spinners";

export default function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [massage, setMassage] = useState(false);
  const [isloading, setIsloading] = useState(false);
  const { handleCurrentUser, currentUser } = useAuth();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsloading(true);
    if (username == "" || email == "") return console.log("fill in");

    const data = { username, email };
    try {
      const response = await axios.post("/api/auth/route", data);
      handleCurrentUser(response.data.user);
      setItems("token", response.data.token);
      setMassage(false);
      setIsloading(false);
    } catch (error) {
      setMassage(true);
      setIsloading(false);
    }

    
  };

  return (
    <Layout>
      {currentUser ? (
        <main>
          {" "}
          You already login please redirect{" "}
          <Link href={"/"} className="text-blue-700">
            Home page
          </Link>{" "}
        </main>
      ) : (
        <main className="w-[400px] h-auto mx-auto mt-[150px] border border-cyan-100 shadow py-6 px-4 rounded-lg">
          <div className="text-base text-black font-semibold text-wrap text-center p-2">
            {" "}
            Sign in{" "}
          </div>
          {massage && (
            <div className="w-full h-auto p-2 my-1 bg-rose-200 text-rose-700 text-xs rounded">
              Ooops! Something went wrong! 
            </div>
          )}
          <form
            onSubmit={handleSubmit}
            className="w-full h-auto flex flex-col gap-2"
          >
            <div className="w-full h-auto flex flex-col items-start justify-start text-sm gap-1 font-normal">
              <label htmlFor="username" className="font-semibold">
                Username
              </label>
              <input
                type="text"
                id="username"
                placeholder="Username"
                required
                className="w-full h-[30px] rounded px-2 outline-none border border-slate-400"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="w-full h-auto flex flex-col items-start justify-start text-sm gap-1 font-normal">
              <label htmlFor="username" className="font-semibold">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Email"
                required
                className="w-full h-[30px] rounded px-2 outline-none border border-slate-400"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full h-[36px] bg-cyan-400 text-white font-semibold text-sm rounded hover:text-cyan-400 hover:bg-white border border-cyan-400 transition mt-4"
            >
              {isloading ? <BeatLoader  color="#000" /> : " Sign in"}
            </button>
          </form>
        </main>
      )}
    </Layout>
  );
}

import Image from "next/image";
import { useAuth } from "@/context";
import Layout from "@/components/layout";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";

export default function Post() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const { posts, currentUser, handleDelete } = useAuth();
  const router = useRouter();
  const { id }: any = router.query;
  const post = posts?.find((c) => c.id == id);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title == "" || body == "") return console.log("fill in");

    const data = { title, body, id: post?.id, userId: post?.userId };
    try {
      const response = await axios.post("/api/post/route", data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <main className="">
        <div className="text-base font-semibold my-2">
          Posts id delete and update
        </div>
        {post && (
          <div className="w-full h-auto grid grid-cols-4 gap-1">
            <div className="w-full h-auto p-1 flex flex-col justify-between items-center border border-slate-400 text-xs font-normal">
              <div className="font-semibold text-center my-1 capitalize">
                {post.title}
              </div>
              <div>{post.body}</div>
              {currentUser?.id == post.userId && (
                <div className="w-full h-auto grid grid-cols-3 rounded text-xs font-normal text-white ">
                  <button
                    onClick={() => handleDelete(post.id)}
                    type="button"
                    className="py-1 px-2 capitalize bg-rose-400"
                  >
                    delete
                  </button>
                </div>
              )}
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col justify-center items-start gap-2 p-2 border border-slate-400 rounded text-xs">
              <label htmlFor="title">Title</label>
              <input
                className="w-full h-auto font-medium py-1 px-2 outline-none border border-slate-700 rounded"
                type="text"
                placeholder="Fill in with your title"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(e.target.value);
                }}
              />
              <label htmlFor="body">Body</label>
              <input
                className="w-full h-auto font-medium py-1 px-2 outline-none border border-slate-700 rounded"
                type="text"
                placeholder="Fill in with your body"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setBody(e.target.value);
                }}
              />
              <button
                type="submit"
                className=" py-1 px-2 capitalize bg-sky-600 text-xs font-normal text-white rounded"
              >
                send
              </button>
            </form>
          </div>
        )}
      </main>
    </Layout>
  );
}

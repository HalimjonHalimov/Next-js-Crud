import { useAuth } from "@/context";
import { PostType } from "@/interface/postInterface";
import { useRouter } from "next/router";

export default function Post({ item }: { item: PostType }) {
  const { currentUser, handleDelete } = useAuth();
  const router = useRouter()
  return (
    <div className="w-full h-auto p-1 flex flex-col justify-between items-center border border-slate-400 text-xs font-normal">
      <div className="font-semibold text-center my-1 capitalize">
        {item.title}
      </div>
      <div>{item.body}</div>
      {currentUser?.id == item.userId && (<div className="w-full h-auto grid grid-cols-3 rounded text-xs font-normal text-white ">
        <button onClick={() => router.push(`/post/${item.id}`)} type="button" className="py-1 px-2 capitalize bg-cyan-400">view</button>
        <button type="button" className="py-1 px-2 capitalize bg-sky-600">edit</button>
        <button onClick={() => handleDelete(item.id)} type="button" className="py-1 px-2 capitalize bg-rose-400">delete</button>
      </div>)}
    </div>
  );
}

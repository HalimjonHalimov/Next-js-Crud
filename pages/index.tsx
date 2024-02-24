import Image from "next/image";
import { useAuth } from "@/context";
import Layout from "@/components/layout";
import Post from "@/components/post";


export default function Home() {
  const { posts } = useAuth();

  return (
      <Layout>
        <main className="">
          <div>Posts</div>
          <div className="w-full h-auto grid grid-cols-5 gap-1 border border-black">
            {posts?.map((item, i) => (
              <Post key={i} item={item}/>
            ))}
          </div>
        </main>
      </Layout>
  );
}

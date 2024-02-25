import Image from "next/image";
import { useAuth } from "@/context";
import Layout from "@/components/layout";
import Post from "@/components/post";
import BeatLoader from "react-spinners/ClipLoader";
import { ScaleLoader } from "react-spinners";
import { CSSProperties } from "react";

const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

export default function Home() {
  const { posts, isloading } = useAuth();

  return (
    <Layout>
      <main className="w-full h-full">
        {isloading ? (
          <div className="w-full h-[100%] flex justify-center items-center">
            <ScaleLoader
              color="#919c9a"
              loading={isloading}
              cssOverride={override}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>
        ) : (
          <>
            <div className="text-base font-medium my-2">Posts</div>
            <div className="w-full h-auto grid grid-cols-5 gap-1">
              {posts?.map((item, i) => (
                <Post key={i} item={item} />
              ))}
            </div>
          </>
        )}
      </main>
    </Layout>
  );
}

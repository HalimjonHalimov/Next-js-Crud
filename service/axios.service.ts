import { PostType } from "@/interface/postInterface";
import axios from "axios";

const PostService = {
  async getAllPosts() {
    const response = await axios.get<PostType[] | null>(
      "https://jsonplaceholder.typicode.com/posts"
    );
    return response;
  },
};
export default PostService;

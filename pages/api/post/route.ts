import { UserType } from "@/interface/userInterface";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { title, body, id, userId } = req.body;

    try {
      const { data } = await axios.put(
        `https://jsonplaceholder.typicode.com/post/${id}`,
        req.body
      );
      console.log(data);
    } catch (error) {
      console.log("error");
    }
    res.status(200).json({ user: true });
  }
}

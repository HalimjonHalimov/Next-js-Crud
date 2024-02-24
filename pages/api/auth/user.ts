import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import axios from "axios";
import { UserType } from "@/interface/userInterface";

const jwtKey = "CRUD-API";

const resetToken = (token: string) => {
  const { id } = jwt.verify(token, jwtKey) as { [key: string]: number };
  return id;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { token } = req.body;
    const userId: number = resetToken(token);

    const { data } = await axios.get<UserType[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    const currentUser = data.find((c) => c.id == userId);

    if (!currentUser)
      return res.status(400).json("User with the given token not found...");

    res.status(200).json({ user: currentUser });
  }
}

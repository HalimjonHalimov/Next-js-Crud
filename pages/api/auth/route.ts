import { getItems } from "@/helper/localstorage";
import { UserType } from "@/interface/userInterface";
import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";

import jwt from "jsonwebtoken";

const jwtKey = "CRUD-API";

const createToken = (id: number) => {
  return jwt.sign({ id }, jwtKey, { expiresIn: "3d" });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { username, email } = req.body;

    const { data } = await axios.get<UserType[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    const existUser = data.find((c) => c.username == username);
    if (!existUser)
      return res.status(400).json("User with the given username not found...");

    if (existUser.email !== email)
      return res.status(400).json("Ooops! Something went wrong...");

    const token = createToken(existUser.id);

    res.status(200).json({ user: existUser, token });
  }
}

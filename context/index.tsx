"use client";
import { getItems, removeItems } from "@/helper/localstorage";
import { PostType } from "@/interface/postInterface";
import { UserType } from "@/interface/userInterface";
import PostService from "@/service/axios.service";
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  state: number;
  currentUser: UserType | null;
  posts: PostType[] | null;
  handleCurrentUser: (data: UserType) => void;
  handleDelete: (id: number) => void;
  handleLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [posts, setPosts] = useState<PostType[] | null>(null);

  const handleCurrentUser = (data: UserType) => {
    setCurrentUser(data);
  };
  const handleLogout = () => {
    removeItems("token");
    setCurrentUser(null);
  };
  const getCurrentUser = async (token: string) => {
    try {
      const { data } = await axios.post("/api/auth/user", { token });
      handleCurrentUser(data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const { data } = await PostService.getAllPosts();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItems("token");
    if (token) {
      getCurrentUser(token);
    }

    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    if (posts) {
      const data = posts.filter((c) => c.id !== id);
      setPosts(data);
    }
  };

  const value = {
    state,
    currentUser,
    posts,
    handleCurrentUser,
    handleDelete,
    handleLogout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context == null) {
    throw new Error("useAuth must be used within a AuthContextProvider");
  }
  return context;
};

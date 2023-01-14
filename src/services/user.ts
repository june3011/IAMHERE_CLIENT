import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface UserDto {
  id: string;
  profileImg: string;
  name: string;
  age: number;
  school: string;
  address: string;
  activity: boolean;
  mbti: string;
}

export interface ChatDto {
  roomId: string;
  user: UserDto;
  message: {
    type: "image" | "text";
    content: string;
    date: string;
    userId: string;
  }[];
}

export const useGetChatRoom = (roomId: number) => {
  return useQuery(["userChat"], () =>
    axios.get<ChatDto>(`${process.env.REACT_BASE_URL}/chat/${roomId}`)
  );
};

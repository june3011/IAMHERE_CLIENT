import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useSpeechRecognition } from "react-speech-recognition";
import io from "socket.io-client";

import SendIcon from "/assets/send.png";

import { useGetChatRoom, UserDto } from "../../services/user";
import Bubble from "./Bubble";
import { useLocation } from "react-router-dom";

const socket = io("localhost:3001");

interface Props {}

const Chat: FC<Props> = ({}) => {
  const { data: chatData } = useGetChatRoom(1);

  const location = useLocation();
  const [chats, setChats] = useState<any>([{}]);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [message, setMessage] = useState<string>("");

  const addChatMessage = (data: any) => {
    console.log(data);

    let message = "";
    if (data.numUsers === 1) {
      message += `there's 1 participant`;
    } else {
      message += `there are ${data.numUsers} participants`;
    }
    setChats(chats.concat(message));
  };

  useEffect(() => {
    socket.emit("add user", "testuser");

    socket.on("login", (data) => {
      setIsConnected(true);
      addChatMessage(data);
    });
    socket.on("user joined", (data) => {
      setChats(chats.concat(`${data.username} joined`));
    });
    socket.on("user left", (data) => {
      setChats(chats.concat(`${data.username} left`));
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("new message", (data) => {
      setChats(chats.concat(`${data.username} : ${data.message}`));
    });
    return () => {
      socket.off("login");
      socket.off("disconnect");
      socket.off("new message");
    };
  });

  const sendMessage = () => {
    console.log(message, chats);
    setChats(chats.concat(`test nickname : ${message}`));
    socket.emit("new message", message);
    setMessage("");
  };

  // useEffect(() => {
  //   if (!chatData) return;
  // }, [chatData]);

  // useEffect(() => {
  //   socket.on("connect", () => {
  //     setIsConnected(true);
  //   });

  //   socket.on("disconnect", () => {
  //     setIsConnected(false);
  //   });

  //   socket.on("pong", () => {
  //     setLastPong(new Date().toISOString());
  //   });

  //   return () => {
  //     socket.off("connect");
  //     socket.off("disconnect");
  //     socket.off("pong");
  //   };
  // }, []);

  // const sendPing = () => {
  //   socket.emit("ping");
  // };

  const profile =
    chatData?.data.user.profileImg ??
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  return (
    <SContainer>
      <STop>
        <img src={profile} alt="profile-image" />
        <div className="profile">
          <p>
            {chatData?.data.user.name} ({chatData?.data.user.age})
          </p>
        </div>
      </STop>
      <SChatBox>
        {chats.map((chat: any) => (
          <Bubble content={chat} />
        ))}
      </SChatBox>
      <SInput>
        <input
          type="text"
          placeholder="친구랑 이야기 해보세요."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
        />
        <img src={SendIcon} alt="" onClick={sendMessage} />
      </SInput>
    </SContainer>
  );
};

export default Chat;

const SContainer = styled.div`
  position: absolute;
  bottom: 30px;
  right: 0;
  padding: 25px;
  width: 350px;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  background-color: white;
  box-shadow: 0px -1px 20px rgba(66, 66, 66, 0.25);
  border-radius: 40px;
  z-index: 10;
`;

const STop = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;

  img {
    width: 60px;
    height: 60px;
    border-radius: 50px;
  }
`;

const SChatBox = styled.div`
  margin: 20px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const SInput = styled.div`
  width: 100%;
  height: 40px;
  background: #f2f2f2;
  border-radius: 19px;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  input {
    background: #f2f2f2;
    border: none;
    outline: none;
  }

  img {
    width: 20px;
    height: 20px;
    cursor: pointer;
  }
`;

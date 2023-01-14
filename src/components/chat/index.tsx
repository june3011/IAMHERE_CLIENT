import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";
import { useSpeechRecognition } from "react-speech-recognition";
import io from "socket.io-client";

import SendIcon from "/assets/send.png";
import VoiceIcon from "/assets/voice.png";

import { useGetChatRoom, UserDto } from "../../services/user";
import Bubble from "./Bubble";

const socket = io("localhost:4000");

interface Props {}

const Chat: FC<Props> = ({}) => {
  const { data: chatData } = useGetChatRoom(1);
  const [state, setState] = useState<any>({ name: "", message: "" });
  const [arrivalChat, setArrivalChat] = useState<any>(null);
  const [name, setName] = useState("");
  const [chat, setChat] = useState<any>([]);

  useEffect(() => {
    socket.emit("joinRoom", name);
  }, []);

  useEffect(() => {
    arrivalChat && setChat((prev: any) => [...prev, arrivalChat]); // 채팅 리스트에 추가
  }, [arrivalChat]);

  useEffect(() => {
    socket.on("chat-msg", (name, message) => {
      // 메세지 수신
      setArrivalChat({ message, name });
    });
  }, [socket]);

  const onMessageSubmit = (e: any) => {
    e.preventDefault();
    const { message } = state;

    socket.emit("chat-msg", name, message);

    setState({ message: "" });
  };

  const profile =
    chatData?.data.user.profileImg ??
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png";
  return (
    <SContainer>
      <input type="text" onChange={(e) => setName(e.target.value)} />
      <STop>
        <img src={profile} alt="profile-image" />
        <div className="profile">
          <p>
            {chatData?.data.user.name} ({chatData?.data.user.age})
          </p>
        </div>
      </STop>
      <SChatBox>
        {chat.map((chat: any) => (
          <Bubble content={chat} />
        ))}
      </SChatBox>
      <SInput>
        <input
          type="text"
          placeholder="친구랑 이야기 해보세요."
          value={state.message}
          onChange={(e) => setState({ ...state, message: e.target.value })}
          onKeyPress={(e) => {
            if (e.key === "Enter") onMessageSubmit(e);
          }}
        />
        <img src={VoiceIcon} alt="" onClick={onMessageSubmit} />
        <img src={SendIcon} alt="" onClick={onMessageSubmit} />
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
  position: relative;
  margin: 20px 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
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

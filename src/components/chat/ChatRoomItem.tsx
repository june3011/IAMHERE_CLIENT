import React, { FC } from "react";
import styled from "@emotion/styled";
import { ChatDto } from "../../services/user";

interface Props {
  chat: {
    name: string;
    profileImg?: string;
    currentMessage: string;
    time: string;
  };
}

const ChatRoomItem: FC<Props> = ({ chat }) => {
  console.log(chat.profileImg);

  return (
    <Container>
      <div className="profile-box">
        <img src={chat?.profileImg} alt="" />
        <div className="text-box">
          <p>{chat.name}</p>
          <p>{chat.currentMessage}</p>
        </div>
      </div>
      <p>{chat.time}</p>
    </Container>
  );
};

export default ChatRoomItem;

const Container = styled.div`
  margin: auto;
  width: 100%;
  max-width: 320px;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  :hover {
  }

  .profile-box {
    display: flex;
    flex-direction: row;
    gap: 10px;

    img {
      width: 40px;
      height: 40px;
      border-radius: 50px;
      object-fit: cover;
    }

    .text-box {
      display: flex;
      flex-direction: column;
      gap: 10px;

      p:last-child {
        font-size: 14px;
        line-height: 17px;
        color: #898989;
      }
    }
  }
`;

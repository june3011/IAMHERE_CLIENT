import React, { FC } from "react";
import styled from "@emotion/styled";

interface Props {
  profileImg: string;
  name: string;
  time: string;
  text: string;
}

const ChatRoomItem: FC<Props> = ({ profileImg, name, time, text }) => {
  return (
    <Container>
      <div className="profile-box">
        <img src={profileImg} alt="" />
        <div className="text-box">
          <p>{name}</p>
          <p>text</p>
        </div>
      </div>
      <p>{time}</p>
    </Container>
  );
};

export default ChatRoomItem;

const Container = styled.div`
  width: 100%;
  max-width: 330px;
  height: 60px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  .profile-box {
    display: flex;
    flex-direction: row;
    gap: 10px;

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

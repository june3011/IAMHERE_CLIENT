import React, { FC, useEffect } from "react";
import styled from "@emotion/styled";
import axios from "axios";

interface Props {
  content: string;
}

const Bubble: FC<Props> = ({ content }) => {
  return (
    <BubbleBox isMine={true}>
      <div className="bubble">{content}</div>
    </BubbleBox>
  );
};

export default Bubble;

const BubbleBox = styled.div<{ isMine: boolean }>`
  position: absolute;
  right: ${({ isMine }) => isMine && 0};
  left: ${({ isMine }) => !isMine && 0};

  .bubble {
    background-color: ${({ isMine }) => (isMine ? "#48D3FF" : "#FFED48")};
    padding: 9px 15px;
    box-sizing: border-box;
    font-size: 14px;
    border-radius: 10px;
    cursor: pointer;
  }
`;

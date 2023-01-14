import styled from "@emotion/styled";
import React, { FC } from "react";

interface Props {}

const Profile: FC<Props> = () => {
  return <SBox></SBox>;
};

export default Profile;

const SBox = styled.div`
  width: 100%;
  height: 70px;
  background-color: gray;
`;

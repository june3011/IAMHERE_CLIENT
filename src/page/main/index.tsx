import React from "react";
import styled from "@emotion/styled";

import Chat from "../../components/chat";
import Map from "./components/Map";

import Register from "../../components/register/Register";

import SideBar from "../../components/SideBar";

const Main = () => {
  return (
    <SContainer>
      <SideBar />
      <Map />
      <Chat />
      <Register />
    </SContainer>
  );
};

export default Main;

const SContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

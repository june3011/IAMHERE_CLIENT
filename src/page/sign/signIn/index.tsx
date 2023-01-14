import { Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as S from "../style";
import banner from "/assets/banner.png";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const SignIn = ({ open, setOpen }: Props) => {
  const [inputs, setInpust] = useState({
    name: "",
    password: "",
  });
  const [name, setName] = useState<boolean>(false);
  const [password, setPassword] = useState<boolean>(false);

  const onChangeHandler = (e: any) => {
    const { name, value } = e.target;

    setInpust({
      ...inputs,
      [name]: value,
    });
  };

  useEffect(() => {
    inputs.name.length > 0 ? setName(true) : setName(false);
    inputs.password.length > 0 ? setPassword(true) : setPassword(false);
  }, [inputs]);

  const local = () => {
    toast("회원가입에 성공했습니다.");

    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <S.SignBox>
        <img src={banner} alt="logo" style={{ width: "80%" }} />
        <div className="input-box">
          <S.NameInput
            border={name}
            type="text"
            placeholder="닉네임"
            name="name"
            value={inputs.name}
            onChange={(e) => onChangeHandler(e)}
          />
          <S.NameInput
            border={password}
            type="text"
            placeholder="비밀번호"
            name="password"
            value={inputs.password}
            onChange={(e) => onChangeHandler(e)}
          />
        </div>

        <button onClick={local}>로그인</button>
        <a href="/signin">계정이 없으신가요?</a>
      </S.SignBox>
    </Modal>
  );
};

export default SignIn;

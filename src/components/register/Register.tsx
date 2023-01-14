import styled from "@emotion/styled";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import ArrowTooltip from "../ArrowTooltip";

const Register = () => {
  const [imageSrc, setImageSrc] = useState<string>("");

  const uploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        formData.append("file", e.target.files[0]);
        setImageSrc("1");
        // if (data) {
        //   setImageSrc(data);
        // }
      }
    } catch (error) {}
  };

  //   useEffect(() => {}, [imageSrc]);

  const test = () => {
    return (
      <>
        <RegisterFormWrap id="register-form">
          <RegisterForm>
            <ExitBtn src="/assets/plus.svg" />
            <RegisterFormUploadWrap>
              {imageSrc === "" ? (
                <>
                  <UploadImg src="/assets/image-cloud.svg" />
                  <TextArea>
                    사진&nbsp;{" "}
                    <UploadText
                      onClick={() => {
                        fileInput.current?.click();
                      }}
                    >
                      업로드
                    </UploadText>
                    하기
                  </TextArea>
                </>
              ) : (
                <UploadedImg src="/assets/lion.png" />
              )}
            </RegisterFormUploadWrap>
            <ImageDescritionInput placeholder="현재 상태를 글로 써보세요" />
          </RegisterForm>
          {/* <RegisterFormTriangle /> */}
        </RegisterFormWrap>
      </>
    );
  };

  const fileInput = useRef<HTMLInputElement>(null);
  return (
    <>
      <FileInput ref={fileInput} type="file" onChange={uploadImage} />
      <ArrowTooltip arrow placement="left" title={test()}>
        <RegisterPlusBtn src="/assets/post_btn.svg" />
      </ArrowTooltip>
    </>
  );
};

export default Register;

const RegisterBackground = styled.div`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: #000000;
  opacity: 0.4;
  z-index: 2;
`;

const RegisterPlusBtn = styled.img`
  position: absolute;
  right: 50px;
  bottom: 50px;
  width: 100px;
  height: 100px;
  cursor: pointer;
`;

const RegisterFormWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 400px;
  height: 415px;
  /* position: absolute;
  bottom: 50px;
  right: 100px; */
  border-radius: 10px;
  z-index: 3;
`;

// const RegisterFormTriangle = styled.div`
//   position: absolute;
//   bottom: 25px;
//   right: 0px;
//   width: 0;
//   height: 0;
//   border-bottom: 30px solid transparent;
//   border-top: 30px solid transparent;
//   border-left: 50px solid #ffffff;
//   border-right: 50px solid transparent;
// `;

const RegisterForm = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  background-color: #ffffff;
  width: 300px;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ExitBtn = styled.img`
  position: absolute;
  top: 10px;
  left: 10px;
  transform: rotate(45);
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const RegisterFormUploadWrap = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  width: 100%;
  height: 280px;
  background-color: #f2f2f2;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const UploadImg = styled.img`
  display: flex;
  width: 54px;
  height: 54px;
`;

const TextArea = styled.p`
  display: flex;
  flex-direction: row;
  color: black;
`;

const UploadText = styled.h1`
  border-bottom: 1px solid #5e13fe;
  font-size: 13px;
  color: #5e13fe;
  cursor: pointer;
`;

const FileInput = styled.input`
  /* position: absolute; */
  /* top: -10px;
  left: -10px; */
  visibility: hidden;
  /* z-index: 10; */
`;

const ImageDescritionInput = styled.input`
  display: flex;
  align-items: center;
  width: 250px;
  margin-top: 15px;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;

const UploadedImg = styled.img`
  width: 280px;
  height: 280px;
`;

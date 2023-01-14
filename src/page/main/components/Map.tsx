import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import MarkerHtml from "./marker";
import ArrowTooltip from "../../../components/ArrowTooltip";
import { Tooltip } from "@mui/material";

const Map = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);
  const markerRef = useRef<any>(null);

  const [markerHover, setMarkerHover] = useState<boolean>(false);

  const [myLocation, setMyLocation] = useState<
    | {
        latitude: number;
        longitude: number;
      }
    | string
  >("");

  // const selectedMarker = useRef<any | null>(null);

  const [comunities, setComunities] = useState([
    {
      latitude: 37.4979517,
      longitude: 127.0276138,
      imageUrl:
        "https://item.kakaocdn.net/do/30cef086c8778d80e1487385bd5efe7b8f324a0b9c48f77dbce3a43bd11ce785",
      coment:
        "다들 어디?! 오늘 나랑 수다 떨어줄 사람 심심해요 ㅠㅠ ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ",
    },
    {
      latitude: 38.2948572,
      longitude: 127.1294857,
      imageUrl:
        "data:image/png;base64,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",
    },
  ]);

  //현재 위치를 추적합니다.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success, error);
    }

    // 위치추적에 성공했을때 위치 값을 넣어줍니다.
    function success(position: any) {
      setMyLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    }

    // 위치 추적에 실패 했을때 초기값을 넣어줍니다.
    function error() {
      setMyLocation({ latitude: 37.4979517, longitude: 127.0276188 });
    }
  }, []);

  useEffect(() => {
    if (typeof myLocation !== "string") {
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        zoomControl: false,
      });
    }
  }, [myLocation]);

  useEffect(() => {
    comunities.map((item: any) => {
      markerRef.current = new naver.maps.Marker({
        position: new naver.maps.LatLng(item.latitude, item.longitude),
        map: mapRef.current,

        icon: {
          content: MarkerHtml(markerHover, item.imageUrl, item.coment),
          size: new naver.maps.Size(38, 58),
          anchor: new naver.maps.Point(19, 58),
        },
      });

      naver.maps.Event.addListener(markerRef.current, "click", (e: any) => {
        const latLng = new naver.maps.LatLng(
          Number(item.latitude),
          Number(item.longitude)
        );
        // 클릭한 마커로 마커로 부드럽게 이동
        mapRef.current.panTo(latLng, e?.coord);
      });
    });
  }, [comunities]);

  return (
    <SContainer markerState={markerHover} ref={mapRef} id="map"></SContainer>
  );
};

export default Map;

const SContainer = styled.div<{ markerState: boolean }>`
  width: 100%;
  height: 100vh;

  #marker-wrap {
    display: flex;
    align-items: center;
    width: auto;
    height: 80px;
    position: relative;

    &:hover {
      #tooltip {
        opacity: 1;
      }
    }

    #tooltip {
      opacity: 0;
      width: 275px;
      height: 430px;
      background-color: #ffffff;
      border-radius: 20px;
      z-index: 3;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      /* gap: 10px; */
      padding-bottom: 10px;
    }
  }

  #img-circle {
    position: absolute;
    left: 11.3%;
    bottom: 30%;
    transform: translate(-50%, -10%);
    width: 40px;
    height: 40px;
    border-radius: 50px;

    &:hover {
      background-color: blue;
    }
  }

  #tooltip-profile-img {
    display: flex;
    width: 100%;
    height: 300px;
    background-color: white;
    border-radius: 20px 20px 0 0;
    background-color: black;
  }

  #tooltip-content {
    display: flex;
    height: 35px;
    font-size: 13px;
    align-items: center;
    padding: 5px 10px;
  }

  #messege-start {
    width: 60px;
    height: 60px;
  }
`;

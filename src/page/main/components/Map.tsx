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

  const comunities = [
    { latitude: 37.4979517, longitude: 127.0276138 },
    { latitude: 37.4449517, longitude: 127.0276318 },
    { latitude: 37.4979517, longitude: 127.0273338 },
    { latitude: 37.4319517, longitude: 127.0273218 },
    { latitude: 37.4971117, longitude: 127.0276088 },
    { latitude: 37.4979417, longitude: 127.0276188 },
  ];

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
          content: MarkerHtml(
            markerHover,
            "https://item.kakaocdn.net/do/30cef086c8778d80e1487385bd5efe7b8f324a0b9c48f77dbce3a43bd11ce785",
            "다들 어디?! 오늘 나랑 수다 떨어줄 사람 심심해요 ㅠㅠ ㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜㅜ"
          ),
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

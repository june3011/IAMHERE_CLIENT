import React, { useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";

const Map = () => {
  const mapRef = useRef<HTMLElement | null | any>(null);

  const [myLocation, setMyLocation] = useState<
    { latitude: number; longitude: number } | string
  >("");

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
    if (typeof myLocation !== "string")
      mapRef.current = new naver.maps.Map("map", {
        center: new naver.maps.LatLng(
          myLocation.latitude,
          myLocation.longitude
        ),
        zoomControl: false,
      });
  }, [mapRef, myLocation]);

  return <SContainer id="map"></SContainer>;
};

export default Map;

const SContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

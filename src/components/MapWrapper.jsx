import React, { useMemo, useRef, useState } from 'react';
import { Map, MapMarker, MarkerClusterer } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useMarkerFromFirebase from '../hooks/useMarkerFromFirebase';
import { setHoveredMarker, setSelectedMarker } from '../redux/modules/markerSlice';
import SearchBar from './SearchBar';
function MapWrapper() {
  const { kakao } = window;
  const mapRef = useRef(null);
  const dispatch = useDispatch();
  const { searchAddress } = useSelector((state) => state.search);
  // const { markers } = useMarker({ kakao, searchAddress });
  const { markersFromFirebase: markers } = useMarkerFromFirebase(searchAddress);
  const { hoveredMarkerId } = useSelector((state) => state.marker);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const bounds = useMemo(() => {
    const bounds = new kakao.maps.LatLngBounds();
    markers?.forEach((marker) => {
      bounds.extend(new kakao.maps.LatLng(marker.y, marker.x));
    });
  }, [markers]);

  // useEffect(() => {
  //   const map = mapRef.current;
  //   if (map) map.setBounds(bounds);
  // }, [markers]);

  const onMarkerMouseEventHandler = (id, eventType) => {
    if (eventType === 'over') {
      setIsOpen(true);
      dispatch(setHoveredMarker(id));
    }
    if (eventType === 'out') {
      setIsOpen(false);
    }
  };
  const onMarkerClickHandler = (id) => {
    dispatch(setSelectedMarker({ markers, id }));
    navigate(`/places/${id}`);
  };

  return (
    <StMapContainer>
      <SearchBar />
      <StMap // 지도를 표시할 Container
        center={{ lat: 36.29676871972202, lng: 127.82474726979814 }}
        isPanto={true}
        ref={mapRef}
        level={13}
        // style={{ width: '600', height: '600' }}
      >
        <MarkerClusterer averageCenter={true} minLevel={10}>
          {markers?.map((item) => (
            <StMapMarker // 인포윈도우를 생성하고 지도에 표시합니다
              key={`${item.id}`}
              position={{ lat: parseFloat(item.y), lng: parseFloat(item.x) }}
              clickable={true}
              // onMouseOver={() => setIsOpen(true)}
              onMouseOver={() => onMarkerMouseEventHandler(item.id, 'over')}
              onMouseOut={() => onMarkerMouseEventHandler(item.id, 'out')}
              onClick={() => onMarkerClickHandler(item.id)}
            >
              {isOpen && item.id === hoveredMarkerId && (
                <div style={{ padding: '5px', color: '#000' }}>
                  <p>{item?.place_name}</p>
                  <p>{item?.phone}</p>
                </div>
              )}
            </StMapMarker>
          ))}
        </MarkerClusterer>
      </StMap>
    </StMapContainer>
  );
}

export default MapWrapper;

const StMapContainer = styled.section`
  width: 100%;
  height: 100%;
`;
const StMap = styled(Map)`
  width: 100%;
  height: 90vh;
  position: relative;
`;

const StMapMarker = styled(MapMarker)`
  cursor: pointer;
`;

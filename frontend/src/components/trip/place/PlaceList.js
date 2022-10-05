import React,{useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import styled from 'styled-components';
import PlaceListItem from './PlaceListItem';

const Container = styled.div`
  margin-top: 1vh;
  height: 62vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Empty = styled.div`
  margin: 21vh auto;
  font-size: 1.2rem;
`;

const PlaceList = ({ map, placeType, keyword, sortReq,pageNum }) => {
  const { travelPlaceList } = useSelector((state) => state.trip);
  const dispatch = useDispatch()

  return (
    <Container>
      {travelPlaceList ? (
        travelPlaceList.content.length > 0 ? (
          travelPlaceList.content.map((place, index) => {
            return (
              <PlaceListItem
                key={index}
                place={place}
                index={index}
                map={map}
                placeType={placeType}
                keyword={keyword}
                sortReq={sortReq}
                pageNum={pageNum}
              />
            );
          })
        ) : (
          <Empty>😅 찾는 조건의 장소가 없습니다. 😅</Empty>
        )
      ) : null}

    </Container>
  );
};

export default PlaceList;

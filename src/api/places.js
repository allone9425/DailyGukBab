import { collection, getDocs, query } from '@firebase/firestore';
import { db } from '../firebase';

export const getPlaces = async () => {
  const querySnapShot = await getDocs(collection(db, 'places'));
  const data = querySnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return data;
};

export const getPlacesWithSearchText = async (queryText) => {
  const placeQuery = query(collection(db, 'places'));
  const querySnapShot = await getDocs(placeQuery);

  const rawData = querySnapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const data = rawData.filter(
    (item) =>
      item.road_address_name.includes(queryText) ||
      item.place_name.includes(queryText) ||
      item.menus.map((menu) => menu.name).includes(queryText)
  );
  return data;
};

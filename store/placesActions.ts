import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../helpers/db";
import Place from "../models/place";
import ENV from "../env";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export type placeActionType = {
  type: string;
  placeData: { id: string; title: string; image: string };
};

export type resultType = {
  insertId: number;
  rows: Object;
  rowsAffected: number;
};

export type placesResultType = {
  insertId: any;
  rows: { _array: Array<placeType>; length: number };
  // rows: {
  //   _array: Array<{
  //     address: string;
  //     id: number;
  //     imageUri: string;
  //     lat: number;
  //     lng: number;
  //     title: string;
  //   }>;
  //   length: number;
  // };
  rowsAffected: number;
};
export type placeType = Array<{
  address: string;
  id: number;
  imageUri: string;
  lat: number;
  lng: number;
  title: string;
}>;

export type abc = placesResultType["rows"]["_array"][0];

export const addPlace = (title: string, image: string, location: Object) => {
  return async (
    dispatch: (arg0: {
      type: string;
      placeData: {
        id: string;
        title: string;
        image: string | null;
        address: string;
        coords: { lat: number; lng: number };
      };
    }) => void
  ) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${ENV.googleApiKey}`
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const resData = await response.json();

    if (!resData.results) {
      throw new Error("Something went wrong");
    }

    const address = resData.results[0].formatted_address;

    const fileName = image.split("/").pop();
    let newPath = "";
    newPath = FileSystem.documentDirectory
      ? FileSystem.documentDirectory + fileName
      : "";
    try {
      await FileSystem.moveAsync({
        from: image,
        to: newPath,
      });
      const dbResult: resultType = await insertPlace(
        title,
        newPath,
        address,
        location.lat,
        location.lng
      );
      // console.log(dbResult);
      dispatch({
        type: ADD_PLACE,
        placeData: {
          id: dbResult.insertId.toString(),
          title: title,
          image: newPath,
          address: address,
          coords: { lat: location.lat, lng: location.lng },
        },
      });
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
};

export const loadPlaces = () => {
  return async (
    dispatch: (arg0: {
      type: string;
      places: placesResultType["rows"]["_array"];
    }) => void
  ) => {
    try {
      const dbPlacesResult: placesResultType = await fetchPlaces();
      console.log(dbPlacesResult);
      dispatch({
        type: SET_PLACES,
        places: [dbPlacesResult.rows._array[0]],
      });
    } catch (err) {
      throw err;
    }
  };
};

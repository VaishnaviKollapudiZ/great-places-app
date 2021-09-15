import { AnyAction } from "redux";
import { ADD_PLACE, SET_PLACES } from "./placesActions";
import Place from "../models/place";
import { placesResultType } from "./placesActions";
import { placeType } from "./placesActions";

export type placeState = {
  places: Array<Place>;
};

const initialState: placeState = {
  places: [],
};

export default (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case ADD_PLACE:
      console.log(action);
      const newPlace = new Place(
        action.placeData.id,
        action.placeData.title,
        action.placeData.image,
        action.placeData.address,
        action.placeData.coords.lat,
        action.placeData.coords.lng
      );

      return { places: state.places.concat(newPlace) };
    case SET_PLACES:
      return {
        places: action.places.map(
          (pl: {
            id: { toString: () => string };
            title: string;
            imageUri: string;
            address: string;
            lat: number;
            lng: number;
          }) =>
            new Place(
              pl.id.toString(),
              pl.title,
              pl.imageUri,
              pl.address,
              pl.lat,
              pl.lng
            )
        ),
      };
    default:
      return state;
  }
};

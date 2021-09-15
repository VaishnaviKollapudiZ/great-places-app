import { createStackNavigator } from "@react-navigation/stack";
import { Platform } from "react-native";
import React from "react";

import PlacesListScreen, {
  screenOptions as PlacesListScreenOptions,
} from "../screens/PlacesListScreen";
import PlaceDetailScreen from "../screens/PlaceDetailScreen";
import NewPlaceScreen, {
  screenOptions as NewPlaceScreenOptions,
} from "../screens/NewPlaceScreen";
import MapScreen from "../screens/MapScreen";
import Colors from "../constants/Colors";

const defaultStackNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};

const PlacesStackNavigator = createStackNavigator();

export const PlacesNavigator = () => {
  return (
    <PlacesStackNavigator.Navigator screenOptions={defaultStackNavOptions}>
      <PlacesStackNavigator.Screen
        name="Places"
        component={PlacesListScreen}
        options={PlacesListScreenOptions}
      />
      <PlacesStackNavigator.Screen
        name="PlaceDetail"
        component={PlaceDetailScreen}
      />
      <PlacesStackNavigator.Screen
        name="NewPlace"
        component={NewPlaceScreen}
        options={NewPlaceScreenOptions}
      />
      <PlacesStackNavigator.Screen name="Map" component={MapScreen} />
    </PlacesStackNavigator.Navigator>
  );
};

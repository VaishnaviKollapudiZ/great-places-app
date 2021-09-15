import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import { PlacesNavigator } from "./navigation/PlacesNavigator";
import placesReducer from "./store/placesReducer";
import { init } from "./helpers/db";

export type RootState = ReturnType<typeof rootReducer>;

init()
  .then(() => {
    console.log("Initialized db");
  })
  .catch((err) => {
    console.log("Initialized db failed");
    console.log(err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

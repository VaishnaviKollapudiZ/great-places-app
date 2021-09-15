import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Colors from "../constants/Colors";

const MapScreen = (props: Object) => {
  const initialLocation: { lat: any; lng: any } = props.route.params
    ? props.route.params.initilaLocation
    : { lat: 0, lng: 0 };
  const readOnly = props.route.params ? props.route.params.readOnly : false;
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lng: 0 });
  const mapRegion = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const selectLocationHandler = (event: {
    nativeEvent: { coordinate: { latitude: number; longitude: number } };
  }) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  let markedCoordinates;
  if (selectedLocation) {
    markedCoordinates = {
      latitude: selectedLocation.lat,
      longitude: selectedLocation.lng,
    };
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      return;
    }
    props.navigation.navigate("NewPlace", { pickedLocation: selectedLocation });
  }, [selectedLocation]);

  useEffect(() => {
    if (readOnly) {
      return;
    }
    props.navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity
            style={styles.headerButton}
            onPress={savePickedLocationHandler}
          >
            <Text style={styles.headerButtonText}>Save</Text>
          </TouchableOpacity>
        );
      },
    });
  }, [savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      region={mapRegion}
      onPress={selectLocationHandler}
    >
      {markedCoordinates && (
        <Marker title="Picked Loaction" coordinate={markedCoordinates}></Marker>
      )}
    </MapView>
  );
};

export const screenOptions = (navData: Object) => {
  const saveFn = navData.route.params.saveLocation;
  return {
    headerTitle: "Pick a location",
  };
};

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  headerButtonText: {
    fontSize: 16,
    color: Platform.OS === "android" ? "white" : Colors.primary,
  },
  headerButton: {
    marginHorizontal: 20,
  },
});

export default MapScreen;

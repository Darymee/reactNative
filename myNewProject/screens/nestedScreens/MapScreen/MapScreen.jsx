import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { styles } from "./MapScreen.styled";

export const MapScreen = ({ route }) => {
  const { latitude, longitude } = route.params.item.location;
  const placeName = route.params.item.photoPlace;
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
            title: "Photo place",
          }}
          title={placeName}
        />
      </MapView>
    </View>
  );
};

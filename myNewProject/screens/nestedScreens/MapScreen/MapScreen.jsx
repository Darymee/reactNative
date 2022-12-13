import { View } from "react-native";
import MapView, { Marker } from "react-native-maps";

import { styles } from "./MapScreen.styled";

export const MapScreen = ({ route }) => {
  const coordinate = route.params.item.location;
  const placeName = route.params.item.info.place;
  return (
    <View style={styles.container}>
      <MapView
        initialRegion={{
          latitude: coordinate.latitude,
          longitude: coordinate.longitude,
          latitudeDelta: 0.001,
          longitudeDelta: 0.006,
        }}
        style={styles.map}
      >
        <Marker
          coordinate={{
            latitude: coordinate.latitude,
            longitude: coordinate.longitude,
          }}
          title={placeName}
        />
      </MapView>
    </View>
  );
};

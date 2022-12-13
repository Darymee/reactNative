import { View, Image, Text } from "react-native";

import { styles } from "./CommentsScreen.styled";

export const CommentsScreen = ({ route }) => {
  const currentPhoto = route.params.item.photo;

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentPhoto }} style={styles.photo} />
      <View>
        <Image />
        <View>
          <Text></Text>
          <View>
            <Text></Text>
          </View>
        </View>
      </View>
    </View>
  );
};

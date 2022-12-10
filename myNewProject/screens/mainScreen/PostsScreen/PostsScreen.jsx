import { Text, View, Image } from "react-native";

import { styles } from "./PostsScreen.styled";

export const PostsScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View>
          <Image
            source={require("../../../assets/images/avatar.png")}
            style={styles.avatar}
          />
        </View>
        <View style={styles.info}>
          <Text style={styles.name}>Natali Romanova</Text>
          <Text style={styles.email}>email@example.com</Text>
        </View>
      </View>
    </View>
  );
};

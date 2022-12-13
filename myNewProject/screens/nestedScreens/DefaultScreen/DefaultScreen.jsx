import { useState, useEffect } from "react";

import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./DefaultScreen.styled";

export const DefaultScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) setPosts((prevState) => [...prevState, route.params]);
  }, [route.params]);

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
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 35 }}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <View>
              <Text style={styles.photoName}>{item.info.name}</Text>
              <View style={styles.photoInfoWrapp}>
                <TouchableOpacity
                  style={styles.comments}
                  onPress={() => navigation.navigate("Comments", { item })}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color="#BDBDBD"
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                  <Text style={styles.commentsCount}>{0}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.place}
                  onPress={() => navigation.navigate("Map", { item })}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.placeName}>{item.info.place}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

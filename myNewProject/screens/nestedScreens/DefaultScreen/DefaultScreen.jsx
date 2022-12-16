import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import db from "../../../firebase/config";

import { styles } from "./DefaultScreen.styled";

export const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { login } = useSelector((state) => state.auth);
  const { email } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPost();
  }, []);

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
          <Text style={styles.name}>{login}</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
      </View>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 35 }}>
            <Image source={{ uri: item.photo }} style={styles.photo} />
            <View>
              <Text style={styles.photoName}>{item.photoName}</Text>
              <View style={styles.photoInfoWrapp}>
                <TouchableOpacity
                  style={styles.comments}
                  onPress={() => navigation.navigate("Comments", { item })}
                >
                  <Feather
                    name="message-circle"
                    size={24}
                    color={item.amount ? "#FF6C00" : "#BDBDBD"}
                    style={{ transform: [{ scaleX: -1 }] }}
                  />
                  <Text
                    style={{
                      ...styles.commentsCount,
                      color: item.amount ? "#212121" : "#BDBDBD",
                    }}
                  >
                    {item.amount ? item.amount : 0}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.place}
                  onPress={() => navigation.navigate("Map", { item })}
                >
                  <Feather name="map-pin" size={24} color="#BDBDBD" />
                  <Text style={styles.placeName}>{item.photoPlace}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

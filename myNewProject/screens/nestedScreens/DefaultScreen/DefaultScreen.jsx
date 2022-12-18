import { useState, useEffect } from "react";

import { useSelector } from "react-redux";

import { Text, View, Image, FlatList, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import db from "../../../firebase/config";

import { styles } from "./DefaultScreen.styled";

export const DefaultScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { login, email, avatar } = useSelector((state) => state.auth);

  const getAllPost = async () => {
    await db
      .firestore()
      .collection("posts")
      .onSnapshot((data) =>
        setPosts(
          data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        )
      );
  };

  const onLike = async (item) => {
    let likes = item.likes ? item.likes + 1 : 0 + 1;

    await db
      .firestore()
      .collection("posts")
      .doc(item.id)
      .set({ ...item, likes });
  };

  useEffect(() => {
    getAllPost();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <View>
          {avatar ? (
            <Image source={{ uri: avatar }} style={styles.avatar} />
          ) : (
            <Image
              source={require("../../../assets/images/layout.png")}
              style={styles.avatar}
            />
          )}
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
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{ ...styles.comments, marginRight: 24 }}
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
                    style={styles.comments}
                    onPress={() => {
                      onLike(item);
                    }}
                  >
                    <Feather
                      name="thumbs-up"
                      size={24}
                      color={item.likes ? "#FF6C00" : "#BDBDBD"}
                    />

                    <Text
                      style={{
                        ...styles.commentsCount,
                        color: item.likes ? "#212121" : "#BDBDBD",
                      }}
                    >
                      {item.likes ? item.likes : 0}
                    </Text>
                  </TouchableOpacity>
                </View>
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

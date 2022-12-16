import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Feather } from "@expo/vector-icons";

import { styles } from "./ProfileScreen.styled";

import db from "../../../firebase/config";

import { authSignOutUser } from "../../../redux/auth/authOperations";

export const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const signOut = () => dispatch(authSignOutUser());

  const getUserPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .where("userId", "==", userId)
      .onSnapshot((data) =>
        setUserPosts(data.docs.map((doc) => ({ ...doc.data() })))
      );
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../assets/images/bgImage.jpg")}
        style={styles.bgImage}
      >
        <View
          style={{
            ...styles.wrapper,
          }}
        >
          <View style={{ position: "absolute", top: 24, right: 16 }}>
            <TouchableOpacity activeOpacity={0.7} onPress={signOut}>
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          </View>
          <View style={styles.avatar} />
          <View style={{ marginBottom: 33 }}>
            <Text style={styles.userName}>{login}</Text>
          </View>
          {!userPosts.length ? (
            <Text>No posts yet</Text>
          ) : (
            <FlatList
              data={userPosts}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 35 }}>
                  <Image source={{ uri: item.photo }} style={styles.photo} />
                  <View>
                    <Text style={styles.photoName}>{item.photoName}</Text>
                    <View style={styles.photoInfoWrapp}>
                      <TouchableOpacity
                        style={styles.comments}
                        onPress={() =>
                          navigation.navigate("Comments", { item })
                        }
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
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import * as ImagePicker from "expo-image-picker";

import {
  Text,
  View,
  ImageBackground,
  FlatList,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

import { Feather, AntDesign } from "@expo/vector-icons";

import { styles } from "./ProfileScreen.styled";

import db from "../../../firebase/config";

import {
  authSignOutUser,
  authStateChangedUser,
} from "../../../redux/auth/authOperations";

import { authSlice } from "../../../redux/auth/authReducer";

const { updateUserProfile } = authSlice.actions;

export const ProfileScreen = ({ navigation }) => {
  const [userPosts, setUserPosts] = useState([]);
  const [userAvatar, setUserAvatar] = useState("");
  const { userId, login, avatar } = useSelector((state) => state.auth);

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
    dispatch(authStateChangedUser());
  }, []);

  const addAvatar = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setUserAvatar(result.assets[0].uri);

      const user = await db.auth().currentUser;

      const { displayName, photoURL } = await db.auth().currentUser;

      const response = await fetch(userAvatar);
      const file = await response.blob();

      await db.storage().ref(`avatar/${userId}`).put(file);

      const processedAvatar = await db
        .storage()
        .ref("avatar")
        .child(userId)
        .getDownloadURL();

      await user.updateProfile({
        displayName: login,
        photoURL: processedAvatar,
      });

      const userUpdateProfile = {
        login: displayName,
        userId: userId,
        avatar: photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
    }
  };

  const deleteAvatar = () => {
    setInfo((prevState) => ({
      ...prevState,
      avatar: "",
    }));
  };

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
          <View
            style={{
              position: "absolute",
              top: -60,
              left: "39%",
            }}
          >
            {avatar ? (
              <Image source={{ uri: avatar }} style={styles.avatar} />
            ) : (
              <Image
                source={require("../../../assets/images/layout.png")}
                style={styles.avatar}
              />
            )}
            <TouchableOpacity style={styles.addButton} onPress={addAvatar}>
              <AntDesign
                name="close"
                size={13}
                color="#FF6C00"
                style={{ transform: [{ rotate: "45deg" }] }}
              />
            </TouchableOpacity>
          </View>
          <View style={{ marginBottom: 33 }}>
            <Text style={styles.userName}>{login}</Text>
          </View>
          {!userPosts.length ? (
            <Text style={{ textAlign: "center" }}>No posts yet</Text>
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
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={{ ...styles.comments, marginRight: 24 }}
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
                          style={styles.comments}
                          activeOpacity={1}
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
          )}
        </View>
      </ImageBackground>
    </View>
  );
};

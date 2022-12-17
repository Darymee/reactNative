import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import {
  View,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";

import db from "../../../firebase/config";

import { Feather } from "@expo/vector-icons";

import { styles } from "./CommentsScreen.styled";

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState([]);

  const item = route.params.item;
  const currentPhoto = route.params.item.photo;
  const postId = route.params.item.id;
  const { login, avatar } = useSelector((state) => state.auth);

  const createPost = async () => {
    if (!comment) return;

    const date = new Date().toLocaleString();

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .add({ comment, login, date, avatar });

    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .set({ ...item, amount: allComments.length + 1 });

    setComment("");
  };

  const getAllPosts = async () => {
    await db
      .firestore()
      .collection("posts")
      .doc(postId)
      .collection("comments")
      .onSnapshot((data) =>
        setAllComments(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
      );
  };

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentPhoto }} style={styles.photo} />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={allComments}
          renderItem={({ item }) => (
            <View
              style={{
                flexDirection: "row",
                alignItems: "baseline",
                justifyContent: "space-between",
              }}
            >
              <View
                style={{
                  width: 28,
                  height: 28,
                  marginRight: 16,
                }}
              >
                {item.avatar ? (
                  <Image style={styles.avatar} source={{ uri: item.avatar }} />
                ) : (
                  <Image
                    style={{ ...styles.avatar, backgroundColor: "grey" }}
                  />
                )}
              </View>
              <View style={styles.comment}>
                <Text style={styles.commentText}>{item.comment}</Text>
                <View style={{ marginRight: 0 }}>
                  <Text style={styles.commentDate}>{item.date}</Text>
                </View>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
      <View>
        <View style={{ borderRadius: "50%", position: "relative" }}>
          <TextInput
            value={comment}
            placeholder="Comment"
            placeholderTextColor="#BDBDBD"
            style={styles.commentInput}
            onChangeText={setComment}
          />
          <TouchableOpacity
            style={styles.btnSend}
            activeOpacity={0.7}
            onPress={createPost}
          >
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

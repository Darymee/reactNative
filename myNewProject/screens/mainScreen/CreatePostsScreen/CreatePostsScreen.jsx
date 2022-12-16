import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { Camera, CameraType } from "expo-camera";
import * as Location from "expo-location";

import { MaterialIcons, Feather } from "@expo/vector-icons";
import {
  KeyboardAvoidingView,
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  TextInput,
  Keyboard,
} from "react-native";

import db from "../../../firebase/config";

import { styles } from "./CreatePostsScreen.styled";

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [photoName, setPhotoName] = useState("");
  const [photoPlace, setPhotoPlace] = useState("");
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(false);

  const { userId, login } = useSelector((state) => state.auth);

  const keyboardHide = () => {
    setIsShowKeyboard(false);

    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsShowKeyboard(true);
  };

  const handleChangeName = (value) => {
    setPhotoName(value);
    statusCheck();
    return;
  };

  const handleChangePlace = (value) => {
    setPhotoPlace(value);
    statusCheck();
    return;
  };

  const statusCheck = () => {
    if (photo && photoName && photoPlace) return setStatus(true);
  };

  const takePhone = async () => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
    setLocation(location.coords);
    statusCheck();
  };

  const uploadPhotoToServer = async () => {
    const response = await fetch(photo);
    const file = await response.blob();
    const uniquePostId = Date.now().toString();

    await db.storage().ref(`postImage/${uniquePostId}`).put(file);

    const processedPhoto = await db
      .storage()
      .ref("postImage")
      .child(uniquePostId)
      .getDownloadURL();

    return processedPhoto;
  };

  const uploadPostToServer = async () => {
    const photo = await uploadPhotoToServer();
    console.log(location);
    const createPost = await db.firestore().collection("posts").add({
      photo,
      photoName,
      photoPlace,
      location,
      userId,
      login,
      likes: 0,
    });
  };

  const sendPhoto = () => {
    if (!status) return;
    uploadPostToServer();
    navigation.navigate("Default");
    deletePost();
  };

  const deletePost = () => {
    setPhotoName("");
    setPhotoPlace("");
    setPhoto(null);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
      }
      let locationRes = await Location.getCurrentPositionAsync();
      setLocation(locationRes);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Camera.requestCameraPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS == "ios" ? "padding" : "height"}
        >
          {photo ? (
            <View style={styles.wrapper}>
              <Image source={{ uri: photo }} style={styles.camera} />
            </View>
          ) : (
            <View style={styles.wrapper}>
              <Camera
                style={styles.camera}
                type={CameraType.back}
                ref={setCamera}
              >
                <TouchableOpacity style={styles.cameraBtn} onPress={takePhone}>
                  <MaterialIcons name="camera-alt" size={24} color="#BDBDBD" />
                </TouchableOpacity>
              </Camera>
            </View>
          )}
          <TouchableOpacity
            style={{ marginTop: 8, marginBottom: 48 }}
            activeOpacity={0.7}
          >
            <Text style={styles.cameraText}>
              {photo ? "Edit photo" : "Upload photo"}
            </Text>
          </TouchableOpacity>
          <View>
            <View style={styles.inputWrapp}>
              <TextInput
                value={photoName}
                placeholder="Name..."
                onFocus={handleFocus}
                onChangeText={handleChangeName}
                style={{
                  ...styles.input,
                }}
              />
            </View>
            <View
              style={{
                ...styles.inputWrapp,
                position: "relative",
                marginBottom: isShowKeyboard ? 50 : 32,
              }}
            >
              <TextInput
                value={photoPlace}
                placeholder="Place..."
                onFocus={handleFocus}
                onChangeText={handleChangePlace}
                style={{
                  ...styles.input,
                  paddingLeft: 28,
                }}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ ...styles.iconWrapp, marginRight: 8 }}
              >
                <Feather name="map-pin" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={sendPhoto}
              style={{
                ...styles.buttonSubmit,
                backgroundColor: status ? "#FF6C00" : "#F6F6F6",
              }}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: status ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDelete} onPress={deletePost}>
              <Feather name="trash-2" size={24} color="#DADADA" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

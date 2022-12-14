import { useEffect, useState } from "react";

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

import { styles } from "./CreatePostsScreen.styled";

const initialState = {
  name: "",
  place: "",
};

export const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [info, setInfo] = useState(initialState);
  const [location, setLocation] = useState(null);
  const [status, setStatus] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);

    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsShowKeyboard(true);
  };

  const handleChangeName = (value) => {
    setInfo((prevState) => ({ ...prevState, name: value }));
    statusCheck();
    return;
  };

  const handleChangePlace = (value) => {
    setInfo((prevState) => ({ ...prevState, place: value }));
    statusCheck();
    return;
  };

  const statusCheck = () => {
    if (photo && info.name && info.place) return setStatus(true);
  };

  const takePhone = async () => {
    const photo = await camera.takePictureAsync();
    const location = await Location.getCurrentPositionAsync();
    setPhoto(photo.uri);
    setLocation(location.coords);
    statusCheck();
  };

  const sendPhoto = () => {
    if (!status) return;
    navigation.navigate("Default", { photo, info, location });
    setInfo(initialState);
    setPhoto(null);
    setStatus(false);
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
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
                value={info.name}
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
                value={info.place}
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
            <TouchableOpacity style={styles.buttonDelete}>
              <Feather name="trash-2" size={24} color="#DADADA" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

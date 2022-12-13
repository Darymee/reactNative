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
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons, Feather } from "@expo/vector-icons";
import { useState } from "react";

export const CreatePostsScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [camera, setCamera] = useState(null);
  const [photo, setPhoto] = useState(null);

  const keyboardHide = () => {
    setIsShowKeyboard(false);

    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsShowKeyboard(true);
  };

  const takePhone = async ({ navigation }) => {
    const photo = await camera.takePictureAsync();
    setPhoto(photo.uri);
  };

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
                placeholder="Name..."
                onFocus={handleFocus}
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
                placeholder="Location..."
                onFocus={handleFocus}
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
              style={{
                ...styles.buttonSubmit,
                backgroundColor: photo ? "#FF6C00" : "#F6F6F6",
              }}
            >
              <Text
                style={{
                  ...styles.buttonText,
                  color: photo ? "#FFFFFF" : "#BDBDBD",
                }}
              >
                Publish
              </Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  );
};

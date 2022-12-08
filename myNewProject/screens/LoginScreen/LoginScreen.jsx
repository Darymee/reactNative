import { useEffect, useState } from "react";

import {
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { styles } from "./LoginScreen.styled";

const initialState = {
  email: "",
  password: "",
};

export function LoginScreen() {
  const [info, setInfo] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    setInfo(initialState);
    console.log(info);
  };

  const handleFocus = () => {
    setIsShowKeyboard(true);
    setIsFocused(true);
  };

  const onShowPassword = () => setShowPassword(!showPassword);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <Text style={{ ...styles.title }}>Sing In</Text>
          <View style={{ marginBottom: isShowKeyboard ? 16 : 43 }}>
            <View style={styles.inputWrapp}>
              <TextInput
                placeholder="Email address"
                style={{
                  ...styles.input,
                  borderColor: isFocused ? "#FF6C00" : "#BDBDBD",
                }}
                value={info.email}
                onFocus={handleFocus}
                onChangeText={(value) =>
                  setInfo((prevState) => ({ ...prevState, email: value }))
                }
              />
            </View>
            <View style={{ marginBottom: 0 }}>
              <TextInput
                placeholder="Password"
                secureTextEntry={showPassword}
                value={info.password}
                style={{
                  ...styles.input,
                  position: "relative",
                  borderColor: isFocused ? "#FF6C00" : "#BDBDBD",
                }}
                onFocus={handleFocus}
                onChangeText={(value) =>
                  setInfo((prevState) => ({ ...prevState, password: value }))
                }
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={onShowPassword}
                style={styles.buttonShow}
              >
                <Text style={styles.buttonShowText}>
                  {showPassword ? "Show" : "Hide"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {!isShowKeyboard && (
            <>
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.button}
                onPress={onSubmit}
              >
                <Text style={styles.buttonText}>Sing In</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ marginBottom: 144 }}
              >
                <Text style={styles.linkText}>
                  Don't have an account yet? Sing Up
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

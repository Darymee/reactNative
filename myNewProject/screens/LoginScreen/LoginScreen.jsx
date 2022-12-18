import { useState } from "react";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../redux/auth/authOperations";

import {
  ImageBackground,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from "react-native";

import { styles } from "./LoginScreen.styled";

const initialState = {
  email: "",
  password: "",
};

export function LoginScreen({ navigation }) {
  const [info, setInfo] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    setIsFocused(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    if (!info.email || !info.password) return;
    console.log(info);
    dispatch(authSignInUser(info));
    setInfo(initialState);
  };

  const handleFocus = () => {
    setIsShowKeyboard(true);
    setIsFocused(true);
  };

  const onShowPassword = () => setShowPassword(!showPassword);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          source={require("../../assets/images/bgImage.jpg")}
          style={styles.bgImage}
        >
          <View
            style={{
              ...styles.wrapper,
              ...Platform.select({
                ios: { paddingBottom: isShowKeyboard ? 375 : 144 },
                android: {
                  paddingBottom: isShowKeyboard ? 32 : 144,
                },
              }),
            }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
              <Text style={{ ...styles.title }}>Sing In</Text>
              <View>
                <View style={{ marginBottom: isShowKeyboard ? 0 : 43 }}>
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
                  <View>
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
                        setInfo((prevState) => ({
                          ...prevState,
                          password: value,
                        }))
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
                  <View>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      style={styles.button}
                      onPress={onSubmit}
                    >
                      <Text style={styles.buttonText}>Sing In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => {
                        navigation.navigate("Register");
                      }}
                    >
                      <Text style={styles.linkText}>
                        Don't have an account yet?
                        <Text> Sing Up</Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </KeyboardAvoidingView>
          </View>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
}

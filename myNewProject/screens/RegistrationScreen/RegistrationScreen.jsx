import { useState } from "react";

import { GoPlusSmall } from "react-icons/go";

import {
  Platform,
  KeyboardAvoidingView,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";

import { styles } from "./RegistrationScreen.styled";

const initialState = {
  login: "",
  email: "",
  password: "",
};

export function RegistationScreen() {
  const [info, setInfo] = useState(initialState);
  const [showPassword, setShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const onSubmit = () => {
    console.log(info);
    setInfo(initialState);
  };

  const onShowPassword = () => setShowPassword(!showPassword);

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.container}>
          <View>
            <View style={styles.avatar} />
            <TouchableOpacity style={styles.addButton}>
              <GoPlusSmall width={13} height={13} />
            </TouchableOpacity>
          </View>
          <Text style={{ ...styles.title }}>Registration</Text>

          <View style={{ marginBottom: isShowKeyboard ? 16 : 43 }}>
            <View style={styles.inputWrapp}>
              <TextInput
                placeholder="Login"
                style={styles.input}
                value={info.login}
                onFocus={() => setIsShowKeyboard(true)}
                onChangeText={(value) =>
                  setInfo((prevState) => ({ ...prevState, login: value }))
                }
              />
            </View>
            <View style={styles.inputWrapp}>
              <TextInput
                placeholder="Email address"
                style={styles.input}
                value={info.email}
                onFocus={() => setIsShowKeyboard(true)}
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
                style={{ ...styles.input, position: "relative" }}
                onFocus={() => setIsShowKeyboard(true)}
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
                <Text style={styles.buttonText}>Sing Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{ marginBottom: 66 }}
              >
                <Text style={styles.linkText}>
                  Do you already have an account? Sing In
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

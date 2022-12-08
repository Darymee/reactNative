import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
    backgroundColor: "#F6F6F6",
    position: "absolute",
    top: -60,
    left: "40%",
  },

  addButton: {
    backgroundColor: "transparent",
    borderRadius: "50%",
    padding: 6,
    position: "relative",
  },
  title: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 33,
    marginTop: 92,
    letterSpacing: 0.01,
  },
  inputWrapp: {
    marginBottom: 16,
  },

  input: {
    fontFamily: "Roboto-Regular",
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    padding: 16,

    borderColor: "#BDBDBD",
    borderWidth: 1,
    placeholderTextColor: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
  },
  buttonShow: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  buttonShowText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    fontSize: 16,
    lineHeight: 19,
  },
  button: {
    marginBottom: 16,
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    padding: 16,
  },
  buttonText: {
    fontFamily: "Roboto-Regular",
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },
  linkText: {
    fontFamily: "Roboto-Regular",
    color: "#1B4371",
    textAlign: "center",
  },
});

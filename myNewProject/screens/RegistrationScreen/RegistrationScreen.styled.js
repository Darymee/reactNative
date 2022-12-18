import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  bgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  wrapper: {
    paddingTop: 92,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    position: "relative",
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 16,
  },

  addButton: {
    backgroundColor: "transparent",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#FF6C00",
    padding: 6,
    position: "absolute",
    top: "60%",
    right: -15,
  },

  deleteButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 6,
    position: "absolute",
    top: "60%",
    right: -15,
  },

  title: {
    fontFamily: "Roboto-Medium",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 30,
    lineHeight: 35,
    color: "#212121",
    marginBottom: 33,
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
    top: 20,
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

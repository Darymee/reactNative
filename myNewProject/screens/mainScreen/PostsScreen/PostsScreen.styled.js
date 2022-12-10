import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  profile: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  avatar: {
    borderRadius: 16,
    width: 60,
    height: 60,
  },
  info: {
    marginTop: 16,
    marginLeft: 8,
  },
  name: {
    color: "#212121",
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
  },
  email: {
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
    fontFamily: "Roboto-Regular",
  },
});

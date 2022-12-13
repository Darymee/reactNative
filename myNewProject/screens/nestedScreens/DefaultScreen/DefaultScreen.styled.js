import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  profile: {
    justifyContent: "flex-start",
    flexDirection: "row",
    marginBottom: 32,
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
  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  photoName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    marginBottom: 11,
  },
  photoInfoWrapp: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  comments: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  commentsCount: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
  },
  place: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  placeName: {
    color: "#212121",
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 9,
    textDecorationLine: "underline",
  },
});

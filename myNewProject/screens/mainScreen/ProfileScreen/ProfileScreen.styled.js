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
    height: 600,
    paddingTop: 92,
    paddingHorizontal: 16,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#FF6C00",
    padding: 6,
    position: "absolute",
    top: "60%",
    right: -15,
  },

  userName: {
    fontFamily: "Roboto-Medium",
    color: "#212121",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
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

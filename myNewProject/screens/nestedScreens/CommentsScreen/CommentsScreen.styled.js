import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 32,
  },

  photo: {
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
    marginBottom: 32,
  },

  listWrapp: {
    flex: 1,
  },

  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },

  comment: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    padding: 16,
    marginBottom: 24,
  },

  userName: {
    color: "#212121",
    fontFamily: "Roboto-Medium",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "left",
  },

  commentText: {
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
  },

  commentDate: {
    color: "#BDBDBD",
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    textAlign: "right",
  },

  commentInput: {
    borderRadius: 50,
    padding: 16,
    borderColor: "#E8E8E8",
    borderWidth: 1,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
  },

  btnSend: {
    backgroundColor: "#FF6C00",
    borderRadius: 50,
    position: "absolute",
    right: 8,
    top: 8,
    width: 34,
    height: 34,
    alignItems: "center",
    justifyContent: "center",
  },
});

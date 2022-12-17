import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 16,
    paddingVertical: 32,
    justifyContent: "space-between",
  },

  wrapper: {
    height: 230,
  },

  camera: {
    flex: 1,
    height: 230,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  cameraBtn: {
    width: 60,
    height: 60,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  cameraText: {
    color: "#BDBDBD",
    fontSize: 16,
    lineHeight: 19,
    fontFamily: "Roboto-Regular",
  },
  inputWrapp: {
    marginBottom: 32,
  },

  input: {
    paddingBottom: 15,
    color: "#212121",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    borderBottomColor: "#BDBDBD",
    borderBottomWidth: 1,
  },

  buttonSubmit: {
    borderRadius: 100,
    paddingVertical: 16,
    // marginBottom: 32,
  },

  buttonText: {
    color: "#FFFFFF",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
  },

  iconWrapp: {
    position: "absolute",
    bottom: 16,
  },

  buttonDelete: {
    width: 70,
    height: 40,
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",

    marginLeft: "auto",
    marginRight: "auto",
  },
});

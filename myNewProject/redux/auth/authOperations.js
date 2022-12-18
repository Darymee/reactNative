import db from "../../firebase/config";
import { Alert } from "react-native";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getSatte) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;
      const { displayName, uid, photoURL } = await db.auth().currentUser;

      if (avatar) {
        const response = await fetch(avatar);
        const file = await response.blob();
        await db.storage().ref(`avatar/${uid}`).put(file);
        const processedAvatar = await db
          .storage()
          .ref("avatar")
          .child(uid)
          .getDownloadURL();

        await user.updateProfile({
          displayName: login,
          photoURL: processedAvatar,
          email,
        });

        dispatch(
          updateUserProfile({
            userId: uid,
            login: displayName,
            email,
            avatar: photoURL,
          })
        );
        return;
      }

      await user.updateProfile({
        displayName: login,
        email,
      });

      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
          email,
        })
      );
    } catch (error) {
      Alert.alert("Error", error.message);
      Alert.alert(error.code);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      Alert.alert(`Welcome, ${email}!`);
    } catch (error) {
      Alert.alert("Error", error.message);
      Alert.alert(error.code);
    }
  };
export const authSignOutUser = () => async (dispatch, getState) => {
  await db.auth().signOut();
  dispatch(authSignOut());
};

export const authStateChangedUser = () => async (dispatch, getState) => {
  await db.auth().onAuthStateChanged((user) => {
    if (user) {
      const userUpdateProfile = {
        userId: user.uid,
        login: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

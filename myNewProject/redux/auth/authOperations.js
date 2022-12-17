import db from "../../firebase/config";
import { authSlice } from "./authReducer";

const { updateUserProfile, authStateChange, authSignOut } = authSlice.actions;

export const authSignUpUser =
  ({ login, email, password, avatar }) =>
  async (dispatch, getSatte) => {
    try {
      await db.auth().createUserWithEmailAndPassword(email, password);

      const user = await db.auth().currentUser;

      await user.updateProfile({
        displayName: login,
      });

      const { uid, displayName } = await db.auth().currentUser;

      const userUpdateProfile = {
        userId: uid,
        login: displayName,
        email,
        avatar,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getSatte) => {
    try {
      const user = await db.auth().signInWithEmailAndPassword(email, password);
      console.log(user);
    } catch (error) {
      console.log(error.message);
      console.log(error.code);
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
        avatar: user.avatar,
      };

      dispatch(updateUserProfile(userUpdateProfile));
      dispatch(authStateChange({ stateChange: true }));
    }
  });
};

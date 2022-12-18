import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFonts } from "expo-font";

import * as SplashScreen from "expo-splash-screen";

import { View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RegistationScreen } from "../screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "../screens/LoginScreen/LoginScreen";
import { Home } from "../screens/mainScreen/Home/Home";

import { authStateChangedUser } from "../redux/auth/authOperations";

SplashScreen.preventAutoHideAsync();

const AuthStack = createNativeStackNavigator();

export const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("../assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("../assets/fonts/Roboto-Bold.ttf"),
  });

  useEffect(() => {
    dispatch(authStateChangedUser());
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="Login">
          {stateChange ? (
            <AuthStack.Screen
              name="Home"
              options={{ headerShown: false }}
              component={Home}
            />
          ) : (
            <>
              <AuthStack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
              <AuthStack.Screen
                name="Register"
                options={{ headerShown: false }}
                component={RegistationScreen}
              />
            </>
          )}
        </AuthStack.Navigator>
      </NavigationContainer>
    </View>
  );
};

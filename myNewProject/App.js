import { useCallback } from "react";
import { View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const AuthStack = createNativeStackNavigator();

import { RegistationScreen } from "./screens/RegistrationScreen/RegistrationScreen";
import { LoginScreen } from "./screens/LoginScreen/LoginScreen";
import { Home } from "./screens/mainScreen/Home/ Home";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    "Roboto-Medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto-Regular.ttf"),
    "Roboto-Bold": require("./assets/fonts/Roboto-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthStack.Navigator initialRouteName="Login">
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
          <AuthStack.Screen
            name="Home"
            options={{ headerShown: false }}
            component={Home}
          />
        </AuthStack.Navigator>
      </NavigationContainer>
    </View>
  );
}
{
}

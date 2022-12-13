import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";

import { DefaultScreen } from "../../nestedScreens/DefaultScreen/DefaultScreen";
import { MapScreen } from "../../nestedScreens/MapScreen/MapScreen";
import { CommentsScreen } from "../../nestedScreens/CommentsScreen/CommentsScreen";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = ({ navigation }) => {
  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        component={DefaultScreen}
        options={{ headerShown: false }}
      />
      <NestedScreen.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Default")}
            >
              <Feather name="arrow-left" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        }}
      />
      <NestedScreen.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerBackTitleVisible: false,
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Default")}
            >
              <Feather name="arrow-left" size={24} color="#212121CC" />
            </TouchableOpacity>
          ),
        }}
      />
    </NestedScreen.Navigator>
  );
};

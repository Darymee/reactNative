import { useDispatch } from "react-redux";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Feather } from "@expo/vector-icons";

import { TouchableOpacity } from "react-native";

import { DefaultScreen } from "../../nestedScreens/DefaultScreen/DefaultScreen";
import { MapScreen } from "../../nestedScreens/MapScreen/MapScreen";
import { CommentsScreen } from "../../nestedScreens/CommentsScreen/CommentsScreen";
import { authSignOutUser } from "../../../redux/auth/authOperations";

const NestedScreen = createNativeStackNavigator();

export const PostsScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const signOut = () => dispatch(authSignOutUser());

  return (
    <NestedScreen.Navigator>
      <NestedScreen.Screen
        name="Default"
        title="Posts"
        component={DefaultScreen}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10, marginBottom: 10 }}
              activeOpacity={0.7}
              onPress={signOut}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
        }}
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

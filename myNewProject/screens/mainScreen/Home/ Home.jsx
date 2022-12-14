import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PostsScreen } from "../PostsScreen/PostsScreen";
import { CreatePostsScreen } from "../CreatePostsScreen/CreatePostsScreen";
import { ProfileScreen } from "../ProfileScreen/ProfileScreen";

import { TouchableOpacity } from "react-native";

import { Feather, Entypo } from "@expo/vector-icons";

const MainTab = createBottomTabNavigator();

export const Home = ({ navigation }) => {
  return (
    <MainTab.Navigator
      initialRouteName="Posts"
      screenOptions={{
        tabBarActiveTintColor: "#ffffff",
        tabBarActiveBackgroundColor: "#FF6C00",
        tabBarInactiveTintColor: "#212121CC",
        tabBarShowLabel: false,
        tabBarStyle: {
          paddingTop: 9,
          paddingHorizontal: 63,
          paddingBottom: 50,
        },
      }}
    >
      <MainTab.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          tabBarIcon: ({ fosuced, size, color }) => (
            <TouchableOpacity>
              <Feather
                name="grid"
                size={size}
                color={color}
                fosuced={fosuced}
              />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 10, marginBottom: 10 }}
              activeOpacity={0.7}
            >
              <Feather name="log-out" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarItemStyle: {
            marginRight: 15,
            width: 70,
            height: 40,

            borderRadius: 20,
          },
        }}
      />
      <MainTab.Screen
        name="Create post"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ fosuced, size, color }) => (
            <TouchableOpacity>
              <Entypo name="plus" size={size} color={color} fosuced={fosuced} />
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16, marginBottom: 10 }}
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Posts")}
            >
              <Feather name="arrow-left" size={24} color="#BDBDBD" />
            </TouchableOpacity>
          ),
          tabBarItemStyle: {
            marginRight: 15,
            width: 70,
            height: 40,

            borderRadius: 20,
          },
        }}
      />
      <MainTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ fosuced, size, color }) => (
            <Feather name="user" size={size} color={color} fosuced={fosuced} />
          ),
          tabBarItemStyle: {
            width: 70,
            height: 40,

            borderRadius: 20,
          },
        }}
      />
    </MainTab.Navigator>
  );
};

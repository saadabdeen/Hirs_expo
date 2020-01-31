import React from "react";

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { Ionicons } from "@expo/vector-icons";
import LoadingScreen from "./screens/LoadingScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";

import HomeScreen from "./screens/HomeScreen";
import PostAdScreen from "./screens/PostAdScreen";
import MyAdScreen from "./screens/MyAdScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostReview from "./screens/PostReview";
import ReviewsScreen from "./screens/ReviewsScreen";
const AppContainer = createStackNavigator(
    {
        default: createBottomTabNavigator(
            {
                Home: {
                    screen: HomeScreen,
                    navigationOptions: {
                             tabBarIcon: ({ tintColor }) => (
                            <Ionicons name="ios-home" size={24} color="#ff6c70"
                                style={{
                                    shadowColor: "#ff6c70",
                                    shadowRadius: 10,
                                    shadowOpacity: 0.3
                                }}
                            />
                             )}
                },
                PostAd: {
                    screen: PostAdScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-add-circle" size={24} color={tintColor} />
                    }
                },
                MyAds: {
                    screen: MyAdScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="logo-buffer" size={24} color={tintColor} />
                    }
                },
                // Review: {
                //     screen: PostReview,
                //     navigationOptions: {
                //         tabBarIcon: ({ tintColor }) => <Ionicons name="ios-notifications" size={24} color={tintColor} />
                //     }
                // },
                Profile: {
                    screen: ProfileScreen,
                    navigationOptions: {
                        tabBarIcon: ({ tintColor }) => <Ionicons name="ios-person" size={24} color={tintColor} />
                    }
                }
            },
            {
                defaultNavigationOptions: {
                    tabBarOnPress: ({ navigation, defaultHandler }) => {
                        if (navigation.state.key === "Post") {
                            navigation.navigate("postModal");
                        } else {
                            defaultHandler();
                        }
                    }
                },
                tabBarOptions: {
                    activeTintColor: "#161F3D",
                    inactiveTintColor: "#B8BBC4",
                    showLabel: false
                }
            }
        ),
        postModal: {
            screen: PostAdScreen
        }
    },
    {
        mode: "modal",
        headerMode: "none"
        // initialRouteName: "postModal"
    }
);

const AuthStack = createStackNavigator({
    Login: LoginScreen,
    Register: RegisterScreen,
    
});
const ReviewStack = createStackNavigator({
    Review: PostReview,
    ShowReview:ReviewsScreen,
    
});

export default createAppContainer(
    createSwitchNavigator(
        {
            Loading: LoadingScreen,
            App: AppContainer,
            Auth: AuthStack,
            Rev:ReviewStack
        },
        {
            initialRouteName: "Loading"
        }
    )
);

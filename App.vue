<template>
    <app-navigator></app-navigator>
</template>

<script>
import {
    createAppContainer, 
    createStackNavigator, 
    createDrawerNavigator
} from "vue-native-router";
import {enableScreens} from "react-native-screens";
import Vue from "vue-native-core";
import {VueNativeBase} from "native-base";
import * as Font from "expo-font";
import HomeScreen from "./src/screens/HomeScreen.vue";
import QrCodeScreen from "./src/screens/QrCodeScreen.vue";
import LoginScreen from "./src/screens/Login.vue";

enableScreens(false);
Vue.use(VueNativeBase);

const DrawerNavigator = createDrawerNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen
  },
  {
    initialRouteName: 'Home'
  }
);
const AppNavigator = createAppContainer(DrawerNavigator);

export default {
    name: "App",
    components: {AppNavigator},
    created() {
        this.loadFonts();
    },
    methods: {
        async loadFonts() {
            try {
                this.isAppReady = false;
                await Font.loadAsync({
                    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
                });
                this.isAppReady = true;
            } catch (error) {
                console.log("some error occured", error);
                this.isAppReady = true;
            }
        },
    },
};
</script>

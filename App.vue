<template>
    <app-navigator></app-navigator>
</template>

<script>
import {createAppContainer, createStackNavigator, createDrawerNavigator} from "vue-native-router";
import {enableScreens} from "react-native-screens";
import Vue from "vue-native-core";
import {Drawer, VueNativeBase} from "native-base";
import * as Font from "expo-font";
import SidebarScreen from "./src/screens/SidebarScreen.vue";
import HomeScreen from "./src/screens/HomeScreen.vue";
import QrCodeScreen from "./src/screens/QrCodeScreen.vue";
import LoginScreen from "./src/screens/LoginScreen.vue";
import RegisterScreen from "./src/screens/RegisterScreen.vue";
import HistoryScreen from "./src/screens/HistoryScreen.vue";
import UserScreen from "./src/screens/UserScreen.vue";

enableScreens(false);
Vue.use(VueNativeBase);

// change to what ever your backend is running on
// dont forget the trailing backlash
Vue.prototype.$api_url = 'https://zuko.r4ck.tech/'


const DrawerNavigator = createDrawerNavigator(
    {
        Home: {screen: HomeScreen},
        Login: {screen: LoginScreen},
        Register: {screen: RegisterScreen},
        QrCode: {screen: QrCodeScreen},
        History: {screen: HistoryScreen},
        UserScreen: {screen: UserScreen}
    },
    {
        initialRouteName: "Home",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: SidebarScreen
    }
);

const AppNavigator = createAppContainer(
    createStackNavigator(
        {
            Drawer: {screen: DrawerNavigator},
            Home: {screen: HomeScreen},
            Login: {screen: LoginScreen},
            Register: {screen: RegisterScreen},
            QrCode: {screen: QrCodeScreen},
            History: {screen: HistoryScreen},
            UserScreen: {screen: UserScreen}
        },
        {
            initialRouteName: "Drawer",
            headerMode: "none"
        }
    )
);

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

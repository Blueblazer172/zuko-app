<template>
    <app-navigator></app-navigator>
</template>

<script>
import {createAppContainer, createStackNavigator} from "vue-native-router";
import { enableScreens } from 'react-native-screens';
import Vue from "vue-native-core";
import {VueNativeBase} from "native-base";
import HomeScreen from "./screens/HomeScreen.vue";
import QrCodeScreen from "./screens/QrCodeScreen.vue";
import LoginScreen from "./screens/Login.vue"

enableScreens(false);
Vue.use(VueNativeBase);

const StackNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        QrCode: QrCodeScreen,
        Login: LoginScreen
    },
    {
        initialRouteName: 'Home',
    }
);
const AppNavigator = createAppContainer(StackNavigator);

export default {
    name: 'App',
    components: {AppNavigator, VueNativeBase},
}

</script>

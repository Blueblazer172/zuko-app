<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";
import Vue from "vue-native-core";
Vue.use(VueNativeBase);
import { VueNativeBase } from "native-base";

import HomeScreen from "./screens/HomeScreen.vue";
import QrCodeScreen from "./screens/QrCodeScreen.vue";
import LoginScreen from "./screens/Login.vue"


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
  components: { AppNavigator,VueNativeBase},

}

</script>

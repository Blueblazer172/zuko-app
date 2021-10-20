<template>
  <app-navigator></app-navigator>
</template>

<script>
import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router";

import HomeScreen from "./screens/HomeScreen.vue";
import QrCodeScreen from "./screens/QrCodeScreen.vue";


const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    QrCode: QrCodeScreen
  },
  {
    initialRouteName: 'Home',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: { AppNavigator },
}
</script>

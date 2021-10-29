<template>
  <nb-container>
      <nb-list>
        <nb-list-item v-if="userData.username">
          <nb-text class="text-bold">Username: {{userData.username}}</nb-text>
        </nb-list-item>
        <nb-list-item
          v-for="data in datas"
          :key="data.route"
          button
          noBorder
          :onPress="() => handleListItemClick(data)"
        >
        <nb-text>{{ data.name }}</nb-text>
        </nb-list-item>
        <nb-list-item v-if="userData.username">
          <nb-text :on-press="logout">Logout</nb-text>
        </nb-list-item>
      </nb-list>
  </nb-container>
</template>

<script>
import { NavigationActions, StackActions } from 'vue-native-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../store';

const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
        });

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  data(){
    return {
      datas: [
        {
          name: "Home",
          route: "Home",
        },
        {
          name: "Register",
          route: "Register",
        },
        {
          name: "QrCode",
          route: "QrCode",
        },
        {
          name: "History",
          route: "History",
        },
        {
          name: "Login",
          route: "Login",
        }]
    };
  },
  methods: {
      logout() {
          store.dispatch('LOGOUT', () => this.navigation.dispatch(resetAction))
        },
      handleListItemClick(dataObj) {
          this.navigation.navigate(dataObj.route);
        }
  },
  computed: {
    userData () {
      return store.state.userObj;
    }
  },
};
</script>

<style>
.text-bold {
    font-weight: bold;
}
</style>
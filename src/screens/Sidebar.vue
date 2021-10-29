<template>
  <nb-container>
    <nb-content :style="stylesObj.drawerContent" :bounces="false">
      <nb-list>
        <nb-list-item>
          <nb-text>{{userData.username}}</nb-text>
        </nb-list-item>
        <nb-list-item>
          <nb-text :on-press="logout">Logout</nb-text>
        </nb-list-item>
        <nb-list-item>
          <Button :onPress="() => this.props.navigation.openDrawer()" title="History"></Button>
        </nb-list-item>
      </nb-list>
    </nb-content>
  </nb-container>
</template>

<script>
import { NavigationActions, StackActions } from 'vue-native-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import store from '../../store';

const resetAction = StackActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'MainActivity' })],
        });

export default {
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
      logout() {
          store.dispatch('LOGOUT', () => this.navigation.dispatch(resetAction))
        }
  },
  computed: {
    userData () {
      return store.state.userObj;
    }
  },
  data: {
    stylesObj: {
        drawerContent: {
            paddingTop: Platform.OS === "android" ? 20 : 30
        }
    },
  }
};
</script>

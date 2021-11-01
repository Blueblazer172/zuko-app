<template>
    <nb-container>
        <nb-list>
            <nb-list-item>
                <text>Muss noch gefixxt werden @TODO</text>
            </nb-list-item>
            <nb-list-item v-if="userData.username">
                <nb-left>
                    <image
                        :style="{ width: 20, height: 30, marginRight: 10 }"
                        :source="LoginIcon"
                    />
                    <nb-text class="text-bold">{{ userData.username }}</nb-text>
                </nb-left>
                <nb-right>
                    <Button
                        mode="outlined"
                        :style="{ width: 100 }"
                        :onPress="logout"
                    >
                        <text class="text-color-black">Logout</text>
                    </Button>
                </nb-right>
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
        </nb-list>
    </nb-container>
</template>

<script>
import { NavigationActions, StackActions } from "vue-native-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../store";
import LoginIcon from "../../assets/Login-Icon.png";
import { Button } from "react-native-paper";

const resetAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({ routeName: "Drawer" })],
});
export default {
    props: {
        navigation: {
            type: Object,
        },
    },
    components: {
        Button,
    },
    data() {
        return {
            LoginIcon,
            login: false,
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
                },
            ],
        };
    },
    methods: {
        logout() {
            store.dispatch("LOGOUT", () =>
                this.navigation.dispatch(resetAction)
            );
            store.state.userObj = {};
        },
        handleListItemClick(dataObj) {
            this.navigation.navigate(dataObj.route);
        },
    },
    computed: {
        userData() {
            return store.state.userObj;
        },
    },
};
</script>

<style>
.text-bold {
    font-weight: bold;
    font-size: 24;
}
.text-color-black {
    color: black;
}
</style>

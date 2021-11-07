<template>
    <nb-container>
        <nb-header transparent v-if="userData.username">
            <nb-left>
                <image :style="{ width: 20, height: 30, marginRight: 10 }" :source="LoginIcon" />
            </nb-left>
            <nb-body>
                <text class="text-bold">{{ userData.username }}</text>
            </nb-body>
            <nb-right>
                <Button mode="outlined" :style="{ width: 100 }" :onPress="logout">
                    <text class="text-color-black">Logout</text>
                </Button>
            </nb-right>
        </nb-header>
        <nb-header transparent v-else>
            <nb-left>
                <Button
                    mode="outlined"
                    :style="{ width: 120 }"
                    :onPress="() => handleListItemClick({ route: 'Register' })"
                >
                    <text class="text-color-black">Register</text>
                </Button>
            </nb-left>
            <nb-body>
                
            </nb-body>
            <nb-right>
                <Button
                    mode="outlined"
                    :style="{ width: 120 }"
                    :onPress="() => handleListItemClick({ route: 'Login' })"
                >
                    <text class="text-color-black">login</text>
                </Button>
            </nb-right>
        </nb-header>
        <nb-list>
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
import HeaderTemplate from "./Header.vue";
import {NavigationActions, StackActions} from "vue-native-router";
import store from "../../store";
import LoginIcon from "../../assets/Login-Icon.png";
import {Button} from "react-native-paper";
import Logo from "../../assets/icon.png";

const resetAction = StackActions.reset({
    index: 0,
    key: null,
    actions: [NavigationActions.navigate({routeName: "Drawer"})],
});

export default {
    props: {
        navigation: {
            type: Object
        }
    },
    components: {
        Button,
        HeaderTemplate,
    },
    data() {
        return {
            LoginIcon,
            Logo,
            login: false,
            datas: [
                {
                    name: "Home",
                    route: "Home",
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
                    name: "User",
                    route: "UserScreen",
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
        }
    },
    computed: {
        userData() {
            return store.state.userObj;
        }
    }
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

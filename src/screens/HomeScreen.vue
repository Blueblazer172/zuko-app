<template>
    <nb-container>
        <image-background :source="homeBg" class="imageContainer">
            <header-template v-bind:navigation="this.props.navigation"></header-template>
            <View :style="{ flex: 1 }"></View>
            <View :style="{ flex: 1 }">
                <view class="text-container">
                    <nb-text class="text-welcome">Zuko-App</nb-text>
                </view>
            </View>
            <View :style="{flex: 10, justifyContent: 'center', alignItems: 'center'}">
                <view class="logo-container">
                    <image :style="{ width: 150, height: 150 }" :source="Logo"/>
                </view>
            </View>
            <View :style="{ flex: 5 }"></View>
            <View :style="{ flex: 10 }">
                <View v-if="userData.username">
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <Button mode="outlined" :style="{ width: 200 }"
                                :onPress="() => this.props.navigation.openDrawer()">
                            <text class="text-color-white">Open Drawer</text>
                        </Button>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <Button mode="outlined" :style="{ width: 200 }"
                                :onPress="() => this.props.navigation.navigate('QrCode')">
                            <text class="text-color-white">Scan your code</text>
                        </Button>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <Button mode="outlined" :style="{ width: 200 }"
                                :onPress="() => this.props.navigation.navigate('History')">
                            <text class="text-color-white">View your Logs</text>
                        </Button>
                    </View>
                </View>
                <View v-else>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <Button mode="outlined" :style="{ width: 200 }"
                                :onPress="() => this.props.navigation.navigate('Login')">
                            <text class="text-color-white">Sign In</text>
                        </Button>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <Button mode="outlined" :style="{ width: 200 }"
                                :onPress="() => this.props.navigation.navigate('Register')">
                            <text class="text-color-white">Sign Up</text>
                        </Button>
                    </View>
                </View>
            </View>
        </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import homeBg from "../../assets/home-background.png";
import Logo from "../../assets/icon.png";
import {Button} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../store";
import axios from "react-native-axios";

export default {
    name: "HomeScreen",
    components: {HeaderTemplate, Button},
    data() {
        return {
            homeBg,
            Logo
        }
    },
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        openDrawer() {
            // @TODO ?
        },
    },
    computed: {
        logging_in() {
            return store.state.logging_in;
        },
        userData() {
            return store.state.userObj;
        },
    },
    async created() {
        let jwt = await AsyncStorage.getItem("jwt")
        let userid = await AsyncStorage.getItem("userid")
        let url = this.$api_url + "api/user/verify/" + userid
        if (userid){
            axios.get(url, {
                    headers: {
                        "x-access-token": jwt,
                    },
                }).then((res) => {
                AsyncStorage.getItem("username").then((val) => {
                    if (val) {
                        this.loaded = true;
                        this.navigation.navigate("Home");
                        store.dispatch("SET_USER", {userObj: {username: val, jwt: jwt, userid: userid}});
                    } else {
                        this.loaded = true;
                    }
                })     
                }).catch(function (error) {
                        if (error.response.status == "401"){
                            alert("no valid token")
                            store.dispatch("LOGOUT", () => {});
                            store.state.userObj = {};
                        } else{
                            console.log(error.response.status)
                        }
                });
        }
    }
};
</script>

<style>
.text-welcome {
    font-size: 50;
    font-weight: bold;
}

.imageContainer {
    flex: 1;
}

.text-color-primary {
    color: blue;
    font-family: Roboto;
}

.logoContainer {
    align-self: center;
    align-items: center;
}

.text-container {
    align-items: center;
    margin-bottom: 50;
    background-color: transparent;
}

.text-color-white {
    color: white;
}

.button-container {
    width: "50%";
}
</style>

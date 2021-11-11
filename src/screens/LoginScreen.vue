<template>
    <nb-container v-if="loaded">
        <image-background :source="defaultBg" class="imageContainer">
            <header-template v-bind:navigation="this.props.navigation"></header-template>
            <View :style="{ flex: 4 }">
                <view class="text-container">
                    <nb-text class="text-welcome">Sign In</nb-text>
                </view>
                <View :style="{justifyContent: 'center', alignItems: 'center'}">
                    <view class="logo-container">
                        <image :style="{ width: 65, height: 100 }" :source="LoginIcon"/>
                    </view>
                </View>
            </View>
            <View :style="{ flex: 5 }"></View>
            <View :style="{ flex: 8 }">
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <TextInput
                        mode="outlined"
                        label="Username"
                        :style="{ width: 200 }"
                        v-model="username"
                    ></TextInput>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <TextInput
                        mode="outlined"
                        label="Passwort"
                        :style="{ width: 200 }"
                        v-model="password"
                        secure-text-entry
                    ></TextInput>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }" :onPress="signIn">
                        <text class="text-color-black">Login</text>
                    </Button>
                </View>
            </View>
        </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import defaultBg from "../../assets/default-background.png";
import LoginIcon from "../../assets/Login-Icon.png";
import {Button, TextInput} from "react-native-paper";
import axios from "react-native-axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import store from "../../store";

export default {
    name: "Login",
    components: {HeaderTemplate, Button, TextInput},
    data() {
        return {
            defaultBg,
            LoginIcon,
            password: this.password,
            username: this.username,
            resData: "",
            loaded: false,
        };
    },
    computed: {
        logging_in() {
            return store.state.logging_in;
        }
    },
    async created() {
        let jwt = await AsyncStorage.getItem("jwt")
        let userid = await AsyncStorage.getItem("userid")
        AsyncStorage.getItem("username").then((val) => {
            if (val) {
                this.loaded = true;
                this.navigation.navigate("Home");
                store.dispatch("SET_USER", { userObj: { username: val, jwt:jwt, userid:userid} });
            } else {
                this.loaded = true;
            }
        })
    },
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        signIn() {
            if (this.username && this.password) {
                axios({
                    method: "post",
                    url: "https://zuko.r4ck.tech/api/auth/signin",
                    data: {
                        password: this.password,
                        username: this.username,
                    }
                })
                .then((res) =>{
                    if (res.status === 200) {
                        store.dispatch("LOGIN", {
                            userObj: {
                                username: res.data.username,
                                jwt: res.data.accessToken,
                                userid: res.data.id.toString()
                            },
                            navigate: this.navigation.navigate,
                        });
                    } else {
                        alert(res.data.message);
                    }
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                });
            } else {
                alert("Supply username and password");
            }
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

.text-color-black {
    color: black;
}

.button-container {
    width: "50%";
}
</style>

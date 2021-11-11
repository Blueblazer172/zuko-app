<template>
    <nb-container>
        <image-background :source="defaultBg" class="imageContainer">
            <header-template v-bind:navigation="this.props.navigation"></header-template>
            <View :style="{ flex: 1}">
                <view class="text-container">
                    <nb-text class="text-welcome">Sign Up</nb-text>
                </view>
                <View :style="{ flex: 1 }"></View>
                <View :style="{ flex: 7 }">
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <TextInput mode='outlined' label="name" :style="{ width: 200 }" v-model='name'></TextInput>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <TextInput mode='outlined' label="username" :style="{ width: 200 }"
                                   v-model='username'></TextInput>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <TextInput mode='outlined' label="email" :style="{ width: 200 }" v-model='email'></TextInput>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center',margin: 5}">
                        <TextInput mode='outlined' label="Passwort" :style="{ width: 200 }"
                                   v-model='password' secure-text-entry>
                        </TextInput>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <TextInput mode='outlined' label="Re-Passwort" :style="{ width: 200 }"
                                   v-model='rePassword' secure-text-entry>
                        </TextInput>
                    </View>
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <Button mode="outlined" :style="{ width: 200 }" :onPress="register">
                            <text class="text-color-black">Register</text>
                        </Button>
                    </View>
                    <View>
                        <view class="text-center">
                            <text>By creating an account you agree to our Terms & Privacy</text>
                        </view>
                    </View>
                </View>
            </View>
        </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import axios from "react-native-axios";
import defaultBg from "../../assets/Register-background.png"
import {Button, TextInput} from "react-native-paper";

export default {
    name: "Register",
    components: {HeaderTemplate, axios, Button, TextInput},
    data() {
        return {
            defaultBg,
            email: this.email,
            name: this.name,
            password: this.password,
            username: this.username,
            rePassword: this.rePassword
        };
    },
    props: {
        navigation: {
            type: Object
        }
    },
    methods: {
        async register() {
            if (this.password && this.password === this.rePassword) {
                const user = {
                    email: this.email,
                    name: this.name,
                    password: this.password,
                    username: this.username
                };

                let register = await axios({
                    method: "post",
                    url: "https://zuko.r4ck.tech/api/auth/signup",
                    data: user
                }).catch(function (error) {
                    if (error.response) {
                        // Request made and server responded
                        console.log(error.response.status);
                        console.log(error.response.data);
                    } else if (error.request) {
                        // The request was made but no response was received
                        console.log(error.request);
                    } else {
                        // Something happened in setting up the request that triggered an Error
                        console.log("Error", error.message);
                    }
                });

                if (register.status === 200) {
                    this.navigation.navigate('Login');
                } else {
                    alert(register.data.message);
                }
            } else {
                alert("Beide Passwörter müssen übereinstimmen");
            }
        },
        terms() {
            this.navigation.navigate("QrCode");
        },
    },
};
</script>

<style>
.text-container {
    align-items: center;
    margin-bottom: 50;
    background-color: transparent;
}

.imageContainer {
    flex: 1;
}

.terms-container {
    align-items: center;
    margin-top: 50;
    background-color: transparent;
}

.button-container {
    align-self: center;
}

.text-welcome {
    font-size: 50;
    font-weight: bold;
}

.text-color-black {
    color: black;
}

.text-center {
    align-items: center;
    margin: 15;
}
</style>

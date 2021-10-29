<template>
    <nb-container>
        <header-template
            v-bind:navigation="this.props.navigation"
        ></header-template>
        <nb-content>
            <nb-form>
                <nb-item>
                    <nb-input
                        placeholder="Name"
                        auto-capitalize="none"
                        v-model="name"
                    />
                </nb-item>
                <nb-item>
                    <nb-input
                        placeholder="Userame"
                        auto-capitalize="none"
                        v-model="username"
                    />
                </nb-item>
                <nb-item>
                    <nb-input
                        placeholder="Email"
                        auto-capitalize="none"
                        v-model="email"
                    />
                </nb-item>
                <nb-item>
                    <nb-input
                        placeholder="Password"
                        auto-capitalize="none"
                        secure-text-entry
                        v-model="password"
                    />
                </nb-item>
                <nb-item>
                    <nb-input
                        placeholder="Repeat Password"
                        auto-capitalize="none"
                        secure-text-entry
                        v-model="rePassword"
                    />
                </nb-item>
                <view :style="{ marginTop: 10 }">
                    <nb-button block v-bind:onPress="register">
                        <nb-text>Register</nb-text>
                    </nb-button>
                </view>
                <view class="terms-container">
                    <nb-text>By creating an account you agree to our</nb-text>
                    <view class="button-container">
                        <nb-button transparent
                            ><nb-text>Terms & Privacy</nb-text></nb-button
                        >
                    </view>
                </view>
            </nb-form>
        </nb-content>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import axios from "react-native-axios";

export default {
    name: "Register",
    components: { HeaderTemplate, axios },
    data() {
        return {
            email: this.email,
            name: this.name,
            password: this.password,
            username: this.username,
            rePassword: this.rePassword,
        };
    },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        async register() {
            if (this.password && this.password === this.rePassword) {
                const user = {
                    email: this.email,
                    name: this.name,
                    password: this.password,
                    username: this.username,
                };

                let test = await axios.post(
                    `https://zuko.r4ck.tech/api/auth/signup`,
                    user
                );
                if (test.status = 200) {
                    this.navigation.navigate('Login');
                } else {
                    alert(test.data.message);
                }
            } else {
                alert("beide Passwörter müssen übereinstimmen");
            }
        },
        terms() {
            this.navigation.navigate("QrCode");
        },
    },
};
</script>

<style>
.terms-container {
    align-items: center;
    margin-top: 50;
    background-color: transparent;
}
.button-container {
    align-self: center;
}
</style>

<template>
    <nb-container>
        <header-template
            v-bind:navigation="this.props.navigation"
        ></header-template>
        <nb-content>
            <nb-form>
                <nb-item>
                    <nb-input placeholder="Email" auto-capitalize="none" v-model="email"/>
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
import bcrypt from "react-native-bcrypt";
import isaac from "isaac";

bcrypt.setRandomFallback((len) => {
	const buf = new Uint8Array(len);

	return buf.map(() => Math.floor(isaac.random() * 256));
});

export default {
    name: "Register",
    components: { HeaderTemplate, axios },
    data(){
        return{
            email: this.email,
            password: this.password,
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
            const user = {
                email: this.email,
                password: bcrypt.hashSync(this.password, 8),
            }
            let test = await axios.post(`https://httpbin.org/post`, { user })
            console.log(test)

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

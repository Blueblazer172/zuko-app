<template>
    <nb-container>
        <header-template
            v-bind:navigation="this.props.navigation"
        ></header-template>
        <nb-content>
            <nb-form>
                <nb-item>
                    <nb-input placeholder="Email" auto-capitalize="none" />
                </nb-item>
                <nb-item>
                    <nb-input
                        placeholder="Password"
                        auto-capitalize="none"
                        secure-text-entry
                    />
                </nb-item>
                <view :style="{ marginTop: 10 }">
                    <nb-button block v-bind:onPress="SignIn">
                        <nb-text>Login</nb-text>
                    </nb-button>
                </view>
            </nb-form>
        </nb-content>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
export default {
    name: "Login",
    components: { HeaderTemplate },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        SignIn() {
            this.navigation.navigate("QrCode");
        },
    },
};
</script>

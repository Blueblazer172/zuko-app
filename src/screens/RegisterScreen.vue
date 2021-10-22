<template>
    <nb-container>
        <nb-header>
            <nb-body>
                <nb-title> Register</nb-title>
            </nb-body>
        </nb-header>
        <nb-content>
            <nb-form>
                <nb-item>
                    <nb-input
                        placeholder="Email"
                        auto-capitalize="none"
                    />
                </nb-item>
                <nb-item>
                    <nb-input
                        placeholder="Password"
                        auto-capitalize="none"
                        secure-text-entry
                    />
                </nb-item>
                <nb-item>
                    <nb-input
                        placeholder="Repeat Password"
                        auto-capitalize="none"
                        secure-text-entry
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
                    <nb-button transparent><nb-text>Terms & Privacy</nb-text></nb-button>
                    </view>
                </view>
            </nb-form>
        </nb-content>
    </nb-container>
</template>

<script>
export default {
    name: "Register",
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        register() {
            this.navigation.navigate("QrCode");
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
<template>
    <view class="container">
        <nb-text>Welcome</nb-text>

        <button title="go to QrCode!" @press="goToQrCode"/>
        <button title="go to Login!" @press="goToLogin"/>
    </view>
</template>

<script>
export default {
    name: "HomeScreen",
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        goToQrCode() {
            this.navigation.navigate("QrCode");
        },
        goToLogin() {
            this.navigation.navigate("Login");
        },
    },
};
</script>

<style>
.container {
    flex: 1;
    background-color: white;
    align-items: center;
    justify-content: center;
}

.text-color-primary {
    color: blue;
    font-size: 30;
}
</style>

<template>
    <nb-container>
        <nb-header>
            <nb-left>
                <nb-button transparent>
                    <nb-icon name="menu"/>
                </nb-button>
            </nb-left>
            <nb-body>
                <nb-title> Home</nb-title>
            </nb-body>
        </nb-header>
        <image-background :source="homeBg" class="imageContainer">
            <view class="text-container"> </view>
            <view class="text-container">
                <nb-h3 :style="{ marginBottom: 8 }" class="text-color-white"
                    >Zuko-App</nb-h3>
                <nb-h3 class="text-color-white">Swipe Right to open Sidebar</nb-h3>

            </view>
            <view :style="{ marginBottom: 80 }"> </view>
        </image-background>
    </nb-container>
</template>

<script>
import homeBg from "../../assets/background.png";
export default {
    name: "HomeScreen",
    data() {
        return {
            homeBg,
        };
    },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        openDrawer() {
            this.navigation.navigate("QrCode");
        },
    },
};
</script>

<style>
.imageContainer {
    flex: 1;
}
.text-color-primary {
    color: blue;
    font-family: Roboto;
}
.logoContainer {
    flex: 1;
    margin-bottom: 30;
}
.logo {
    position: absolute;
    width: 280;
    height: 100;
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
    background-color: #6faf98;
    align-self: center;
}
</style>

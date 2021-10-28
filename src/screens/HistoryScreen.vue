<template>
    <nb-container>
        <header-template
            v-bind:navigation="this.props.navigation"
        ></header-template>
        <image-background :source="homeBg" class="imageContainer">
            <view class="text-container"> </view>
            <view class="text-container">
                <nb-h1 class="text-color-white">maintenence</nb-h1>
                <nb-h3 class="text-color-white"
                    >soon your access course will be displayed here</nb-h3
                >
                <button :on-press="getDataApi" title="Api-Request"></button>
                <nb-text class="text-color-white"
                    >respose data: {{ apiData }}</nb-text
                >
            </view>
            <view :style="{ marginBottom: 80 }"> </view>
        </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import homeBg from "../../assets/background.png";
import axios from "react-native-axios";
export default {
    name: "HistoryScreen",
    components: { HeaderTemplate, axios },
    data() {
        return {
            homeBg,
            apiData: "",
        };
    },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        async getDataApi() {
            let test = await axios.get("https://zuko.r4ck.tech/api");
            this.apiData = test.data;
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

<template>
    <nb-container>
        <image-background :source="defaultBg" class="imageContainer">
            <header-template
                v-bind:navigation="this.props.navigation"
            ></header-template>
            <View :style="{ flex: 1 }">
                <view class="text-container">
                    <nb-h1 class="text-color-white">QrCodeScanner</nb-h1>
                    <text class="text-color-white"
                        >Press the Button to open the Camera, scan the Qr-Code
                        on the door, to open it</text
                    >
                </view>
            </View>
            <View :style="{ flex: 1 }"></View>
            <View :style="{ flex: 3 }">
                <View
                    :style="{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 5,
                    }"
                >
                    <Button
                        mode="outlined"
                        :style="{ width: 200 }"
                        :onPress="toggleCam"
                    >
                        <text class="text-color-black">toggleCam</text>
                    </Button>
                </View>
            </View>
            <View :style="{ flex: 1 }"></View>
            <View :style="{ flex: 7 }">
                <bar-code-scanner
                    v-if="showCam"
                    :onBarCodeScanned="handleBarCodeScanned"
                    :barCodeTypes="[BarCodeScanner.Constants.BarCodeType.qr]"
                    :style="{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 15,
                    }"
                />
                <view :style="{ alignItems: 'center' }" v-else>
                    <view v-if="BarcodeData">
                        <text :style="{ fontSize: 25 }"
                            >QrCode-Data: {{ BarcodeData }}</text
                        >
                        <view v-if="userData.username">
                            <Button
                                mode="outlined"
                                :style="{ width: 200 }"
                                :onPress="askPermission"
                            >
                                <text class="text-color-black"
                                    >Access-Room</text
                                >
                            </Button>
                        </view>
                    </view>
                </view>
            </View>
        </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import * as Permissions from "expo-permissions";
import { Camera } from "expo-camera";
import { BarCodeScanner } from "expo-barcode-scanner";
import defaultBg from "../../assets/default-background.png";
import { Button } from "react-native-paper";
import { StyleSheet } from "react-native";
import axios from "react-native-axios";
import store from "../../store";

export default {
    name: "QrCodeScreen",
    components: { HeaderTemplate, BarCodeScanner, Button },
    data() {
        return {
            StyleSheet: StyleSheet,
            defaultBg,
            BarCodeScanner: BarCodeScanner,
            BarcodeData: {},
            showCam: false,
        };
    },
    mounted() {
        Camera.requestCameraPermissionsAsync();
    },
    computed: {
        userData() {
            return store.state.userObj;
        },
    },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        async handleBarCodeScanned(e) {
            try{
                this.BarcodeData = JSON.parse(e.data);
            }
            catch{
            }
            this.showCam = false;
        },
        async askPermission() {
            let test = await axios({
                method: 'post',
                headers: {'x-access-token': store.state.userObj.jwt},
                url: 'https://httpbin.org/post',
                data: {
                    room: this.BarcodeData.room,
                }
            })
            console.log(test)
        },
        toggleCam() {
            this.showCam = !this.showCam;
            this.BarcodeData = "";
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

.text-container {
    align-items: center;
    margin-left: 15;
    margin-right: 15;
    background-color: transparent;
}
.text-color-white {
    color: white;
}
.button-container {
    align-self: center;
}
.camera-container {
    flex: 1;
}
.text-color-black {
    color: black;
}
</style>

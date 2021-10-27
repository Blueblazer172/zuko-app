<template>
    <nb-container>
        <header-template
            v-bind:navigation="this.props.navigation"
        ></header-template>
        <nb-grid>
            <image-background :source="homeBg" class="imageContainer">
                <View :style="{ flex: 1}">
                    <nb-col>
                            <view class="text-container">
                            <nb-h1 class="text-color-white">QrCodeScanner</nb-h1>
                            <text class="text-color-white">Press the Button to open the Camera,
                                    scan the Qr-Code on the door, to open it</text>
                            </view>
                </View>
                <View :style="{ flex: 1}">
                                <view class="button-container">
                                <button :on-press="toggleCam" title="showCam"></button>
                                <button :on-press="resetData" title="resetData"></button>
                                <nb-h3 class="text-color-white">Qr-Code data: {{BarcodeData}}</nb-h3>
                            </view> 
                </View>
                <View :style="{ flex: 3}">
                    <bar-code-scanner
                    v-if="showCam"
                        :onBarCodeScanned="handleBarCodeScanned"
                        :barCodeTypes="[BarCodeScanner.Constants.BarCodeType.qr]"
                        :style="{position: 'absolute', left: 0, right: 0, top: 0, bottom: 15}"
                        />
                </View>
            </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import homeBg from "../../assets/background.png";
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import { View } from 'react-native';
export default {
    name: "QrCodeScreen",
    components: { HeaderTemplate,BarCodeScanner,View },
    data() {
        return {
            StyleSheet: StyleSheet,
            homeBg,
            BarCodeScanner: BarCodeScanner,
            BarcodeData: '',
            showCam: false,
        };
    },
    mounted () {
    Permissions.askAsync(Permissions.CAMERA)
    },
    props: {
        navigation: {
            type: Object,
        },
    },
   methods: {
    handleBarCodeScanned (e) {
        this.BarcodeData = e.data
    },
    toggleCam() {
        this.showCam = !this.showCam;
    },
    resetData(){
        this.BarcodeData = ''
    },
  }  
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
.button-container{
    align-self: center;
}
.camera-container{
    flex: 1;
}

</style>

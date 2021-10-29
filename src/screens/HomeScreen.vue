<template>
    <nb-container>
        <image-background :source="homeBg" class="imageContainer">
            <View :style="{ flex: 2 }"></View>
            <View :style="{ flex: 1 }">
                <view class="text-container">
                    <nb-text class="text-welcome">Zuko-App</nb-text>
                </view>
            </View>
            <View
                :style="{
                    flex: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }"
            >
                <view class="logo-container">
                    <image
                        :style="{ width: 150, height: 150 }"
                        :source="Logo"
                    />
                </view>
            </View>
            <View :style="{ flex: 5 }"></View>
            <View :style="{ flex: 10 }">
                <View
                    :style="{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 5,
                    }"
                >
                    <Button mode="outlined" :style="{width: 200}" :onPress="() => this.props.navigation.openDrawer()">
                        <text class="text-color-white">Getting Started</text>
                    </Button>
                </View>
                <View
                    :style="{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 5,
                    }"
                >
                    <Button mode="outlined" :style="{width: 200}" :onPress="() => this.props.navigation.navigate('Login')">
                        <text class="text-color-white">Sign In</text>
                    </Button>
                </View>
                <View
                    :style="{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        margin: 5,
                    }"
                >
                    <Button mode="outlined" :style="{width: 200}" :onPress="() => this.props.navigation.navigate('Register')">
                        <text class="text-color-white">Sign Up</text>
                    </Button>
                </View>
            </View>
        </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import homeBg from "../../assets/home-background.png";
import Logo from "../../assets/icon.png";
import { Button } from "react-native-paper";
export default {
    name: "HomeScreen",
    components: { HeaderTemplate, Button },
    data() {
        return {
            homeBg,
            Logo,
        };
    },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        openDrawer() {},
    },
};
</script>

<style>
.text-welcome {
    font-size: 50;
    font-weight: bold;
}
.imageContainer {
    flex: 1;
}
.text-color-primary {
    color: blue;
    font-family: Roboto;
}
.logoContainer {
    align-self: center;
    align-items: center;
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
    width: "50%";
}
</style>

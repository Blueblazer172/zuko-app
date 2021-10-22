<template>
    <nb-container>
      <nb-container>
        <nb-header>
            <nb-body>
                <nb-title> History</nb-title>
            </nb-body>
        </nb-header>
        <image-background :source="homeBg" class="imageContainer">
            <view class="text-container"> </view>
            <view class="text-container">
                <nb-h1 class="text-color-white">maintenence</nb-h1>
                <nb-h3 class="text-color-white">soon your access course will be displayed here</nb-h3>
            </view>
            <view :style="{ marginBottom: 80 }">
            </view>
        </image-background>
    </nb-container>
</template>

<script>
import homeBg from "../../assets/background.png";
export default {
    name: "HistoryScreen",
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
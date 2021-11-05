<template>
    <nb-container>
        <image-background :source="homeBg" class="imageContainer">
            <header-template
                v-bind:navigation="this.props.navigation"
            ></header-template>
            <View :style="{ flex: 2 }"></View>
        </image-background>
    </nb-container>
</template>

<script>
import moment from 'moment';
import HeaderTemplate from "./Header.vue";
import homeBg from "../../assets/home-background.png";
export default {
    name: "HomeScreen",
    components: { HeaderTemplate},
    data() {
        return {
            homeBg,
            test: moment("2021-11-05T15:21:13.000Z").format('L')
        }
    },
    methods:{
    }
}
</script>

<style>
.imageContainer {
    flex: 1;
}
</style>
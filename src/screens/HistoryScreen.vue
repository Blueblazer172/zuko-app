<template>
    <nb-container>
        <image-background :source="defaultBg" class="imageContainer">
            <header-template
                v-bind:navigation="this.props.navigation"
            ></header-template>
            <View :style="{ flex: 4 }">
                <view class="text-container">
                    <nb-text class="text-welcome">History</nb-text>
                    <text class="text-color-white"
                    >Down below, your latested accesses will be listed.
                    </text
                    >
                </view>
            </View>
            <View :style="{ flex: 5 }"></View>
            <View :style="{ flex: 15 }">
                <nb-icon :onPress="historyData" :style="{fontSize: 40}" name="refresh" />
                <nb-list>
                    <nb-list-item>
                        <nb-left>
                            <text>Room</text>
                        </nb-left>
                        <nb-body>
                            <text>Time</text>
                        </nb-body>
                        <nb-right>
                            <text>Date</text>
                        </nb-right>
                    </nb-list-item >
                    <nb-list-item v-if="!logs">
                        <nb-left>
                            <text></text>
                        </nb-left>
                        <nb-body>
                            <text>no Logs</text>
                        </nb-body>
                        <nb-right>
                            <text></text>
                        </nb-right>
                    </nb-list-item >
                    <nb-spinner v-if="loading"></nb-spinner>
                    <ScrollView v-if="logs">
                        <nb-list-item
                            v-for="log in logs.slice().reverse()"
                            :key="log.created"
                            button
                        >
                            <nb-left>
                                <text>{{ log.roomName }}</text>
                            </nb-left>
                            <nb-body>
                                <text>{{ formatTime(log.created) }}</text>
                            </nb-body>
                            <nb-right>
                                <text>{{ formatDate(log.created) }}</text>
                            </nb-right>
                        </nb-list-item>
                    </ScrollView>
                </nb-list>
            </View>
            <View :style="{ flex: 1 }"></View>
        </image-background>
    </nb-container>
</template>

<script>
import moment from "moment";
import {DataTable} from "react-native-paper";
import HeaderTemplate from "./Header.vue";
import defaultBg from "../../assets/Register-background.png";
import axios from "react-native-axios";
import store from "../../store";
import "moment/locale/de";
// @TODO fix navigation after logout

export default {
    name: "HistoryScreen",
    components: {HeaderTemplate, DataTable},
    data() {
        return {
            defaultBg,
            loading: false,
            logs: null,
        };
    },
    computed: {
        userData() {
            return store.state.userObj;
        },
    },
    mounted() {
        this.historyData();
    },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        formatDate(date) {
            return moment(date).locale("de").format("L");
        },
        formatTime(date) {
            return moment(date).locale("de").format("LTS");
        },
        async historyData() {
            this.loading = true
            this.logs = null;
            if (store.state.userObj.userid){
                let url =
                    this.$api_url + "api/user/" + store.state.userObj.userid + "/log";
                const res = await axios.get(url, {
                    headers: {
                        "x-access-token": store.state.userObj.jwt,
                    },
                });
                if(res.data[0].created){
                    this.logs = res.data;
                }
                this.loading = false
            }
            else {
                this.loading = false
            }
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

.text-welcome {
    font-size: 50;
    font-weight: bold;
}
</style>

<template>
    <nb-container>
        <image-background :source="background_image" class="background-image">
            <header-template v-bind:navigation="this.props.navigation"></header-template>
            <View :style="{ flex: 1 }">
                <View class="caption-box">
                    <Text class="caption-text">User Page</Text>
                    <Text :style="{textAlignVertical: 'center', textAlign: 'center', color: 'white'}">
                        on this screen you will be able to change your privat information
                    </Text>
                </View>
            </View>
            <View :style="{ flex: 3 }"></View>
            <View>
                <text>Name:{{ userInformation }}</text>
            </View>
            <View>
                <text>API:{{ api }}</text>
            </View>
            <View v-if="menu">
                <View v-if="!view_Password" :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }"
                            :onPress="() => {view_Password = !view_Password; menu = !menu}">
                        <text class="text-color-black">change Password</text>
                    </Button>
                </View>
                <View v-if="!view_Email" :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }"
                            :onPress="() => {view_Email = !view_Email; menu = !menu}">
                        <text class="text-color-black">change Email</text>
                    </Button>
                </View>
            </View>
            <View v-if="!menu" :style="{ flex: 10 }"></View>
            <View v-if="view_Password">
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <TextInput
                        mode="outlined"
                        label="Passwort"
                        :style="{ width: 200 }"
                        v-model="password"
                        secure-text-entry
                    ></TextInput>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <TextInput
                        mode="outlined"
                        label="verify Passwort"
                        :style="{ width: 200 }"
                        v-model="re_password"
                        secure-text-entry
                    ></TextInput>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }" :onPress="changePassword">
                        <text class="text-color-black">Change Password</text>
                    </Button>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }"
                            :onPress="() => {view_Password = !view_Password; menu = !menu}">
                        <text class="text-color-black">Zurück</text>
                    </Button>
                </View>
            </View>
            <View v-if="view_Email">
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <TextInput mode='outlined' label="email" :style="{ width: 200 }" v-model='email'></TextInput>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                        <TextInput mode='outlined' label="verify email" :style="{ width: 200 }"
                                   v-model='email'></TextInput>
                    </View>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }" :onPress="changeEmail">
                        <text class="text-color-black">Change Email</text>
                    </Button>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }"
                            :onPress="() => {view_Email = !view_Email; menu = !menu}">
                        <text class="text-color-black">Zurück</text>
                    </Button>
                </View>
            </View>
            <View :style="{ flex: 5 }">
            </View>
        </image-background>
    </nb-container>
</template>

<script>
import HeaderTemplate from "./Header.vue";
import {Button, TextInput} from "react-native-paper";
import background_image from "../../assets/Register-background.png";
import axios from "react-native-axios";
import store from "../../store";

export default {
    name: "HomeScreen",
    components: {HeaderTemplate, Button, TextInput},
    data() {
        return {
            background_image,
            view_Password: false,
            view_Email: false,
            menu: true,
            password: "",
            re_password: "",
            email: "",
            userInformation: null,
            api: this.$api_url,
        }
    },
    computed: {
        userData() {
            return store.state.userObj;
        },
    },
    mounted() {
        this.getUser();
    },
    methods: {
        changePassword() {
            // ChangePassword Function
            this.view_Password = !this.view_Password;
            this.menu = !this.menu;
        },
        changeEmail() {
            // ChangeEmail Function
            this.view_Email = !this.view_Email;
            this.menu = !this.menu;
        },
        getUser() {
            axios({
                method: 'get',
                headers: {'x-access-token': store.state.userObj.jwt},
                url: this.$api_url + 'api/user/' + store.state.userObj.userid,
            })
                .then((res) => {
                    console.log(res.data)
                    this.userInformation = res.data
                })
                .catch(function (error) {
                    if (error.response) {
                        console.log(error.response.status);
                        console.log(error.response.data);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log("Error", error.message);
                    }
                });
        },
    }
}
</script>

<style>
.background-image {
    flex: 1;
}

.text-color-black {
    color: black;
}

.caption-box {
    align-items: center;
    background-color: transparent;
}

.caption-text {
    font-weight: bold;
    font-size: 45;
    color: black;
}

</style>

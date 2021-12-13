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
            <View :style="{ flex: 7, marginLeft: 15}"></View>
            <View v-if="menu">
                <View v-if="userInformation" :style="{marginLeft: 15}">
                    <title :style="{ fontSize: 25, textAlignVertical: 'center', textAlign: 'center' , marginBottom:15}">Account:</Title>
                    <text >Name: {{ userInformation.name }}</text>
                    <text>Email: {{ userInformation.email }}</text>
                    <text>username: {{ userInformation.username }}</text>
                </View>
            </View>
            <View :style="{ flex: 3 }"></View>
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
                <View v-if="userInformation" :style="{marginLeft: 15}">
                    <title :style="{ fontSize: 20,textAlignVertical: 'center', textAlign: 'center', marginTop: 10}">
                        For more go to our website
                    </Title>
                    <Title :style="{ fontSize: 15,textAlignVertical: 'center', textAlign: 'center'}">{{api}}</Title>
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
                    <Button mode="outlined" :style="{ width: 200 }" :onPress="updatePassword">
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
                                   v-model='re_email'></TextInput>
                    </View>
                </View>
                <View :style="{flexDirection: 'row', justifyContent: 'center', margin: 5}">
                    <Button mode="outlined" :style="{ width: 200 }" :onPress="updateMail">
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
import {Button, TextInput, Title} from "react-native-paper";
import background_image from "../../assets/Register-background.png";
import axios from "react-native-axios";
import store from "../../store";

export default {
    name: "HomeScreen",
    components: {HeaderTemplate, Button, TextInput, Title},
    props: {
        navigation: {
            type: Object,
        },
    },
    data() {
        return {
            background_image,
            view_Password: false,
            view_Email: false,
            menu: true,
            password: "",
            re_password: "",
            email: "",
            re_email:"",
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
        let user = this.userData
        if (user.userid){
            this.getUser();
        }
    },
    methods: {
        logout() {
            store.dispatch("LOGOUT", () =>
                store.state.userObj = {}
            );
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
        updatePassword() {
            if (this.password && this.re_password && this.password === this.re_password) {
                axios({
                    method: "put",
                    headers: {'x-access-token': store.state.userObj.jwt},
                    url: this.$api_url + 'api/user/' + store.state.userObj.userid,
                    data: {
                        fields:{
                            password: this.password,
                        }
                    },
                })
                    .then((res) => {
                            this.view_Password = !this.view_Password;
                            this.menu = !this.menu;
                            alert("you changed your password successfully")
                            this.logout()
                            this.navigation.navigate("Login");
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
            } else {
                alert("check your Input");
            }
        },
        updateMail() {
            if (this.email && this.re_email && this.email === this.re_email) {
                axios({
                    method: "put",
                    headers: {'x-access-token': store.state.userObj.jwt},
                    url: this.$api_url + 'api/user/' + store.state.userObj.userid,
                    data: {
                        fields:{
                            email: this.email,
                        }
                    },
                })
                    .then((res) => {
                            this.getUser()
                            this.view_Email = !this.view_Email;
                            this.menu = !this.menu;
                            alert("you changed your mail successfully")
                        })
                    .catch(function (error) {
                        alert("something went Wrong")
                        if (error.response) {
                            console.log(error.response.status);
                            console.log(error.response.data);
                        } else if (error.request) {
                            console.log(error.request);
                        } else {
                            console.log("Error", error.message);
                        }
                    });
            } else {
                alert("check your Input");
            }
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

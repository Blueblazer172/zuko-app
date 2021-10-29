<template>
    <nb-container v-if="loaded">
        <header-template
            v-bind:navigation="this.props.navigation"
        ></header-template>
        <nb-content>
            <nb-form>
                <nb-item>
                    <nb-input
                        placeholder="Userame"
                        auto-capitalize="none"
                        v-model="username"
                    />
                </nb-item>
                <nb-input
                    placeholder="Password"
                    auto-capitalize="none"
                    secure-text-entry
                    v-model="password"
                />
                <view :style="{ marginTop: 10 }">
                    <nb-button block v-bind:onPress="SignIn">
                        <nb-spinner v-if="logging_in" size="small" />
                        <nb-text>Login</nb-text>
                    </nb-button>
                    <view v-if="resData">
                        <text>id: {{ resData.id }}</text>
                        <text>username: {{ resData.username }}</text>
                        <text>email: {{ resData.email }}</text>
                        <text>roles: {{ resData.roles }}</text>
                        <text>jwt: {{ resData.accessToken }}</text>
                    </view>
                </view>
            </nb-form>
        </nb-content>
    </nb-container>
</template>

<script>
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderTemplate from "./Header.vue";
import axios from "react-native-axios";
import store from '../../store';

export default {
    name: "Login",
    components: { HeaderTemplate },
    data(){
        return{
            password: this.password,
            username: this.username,
            resData: '',
            loaded: false
        };
    },
    computed: {
        logging_in () {
        return store.state.logging_in;
        },
    },
    created(){
        AsyncStorage.getItem('username').then((val) => {
        if (val) {
            this.loaded = true
            this.navigation.navigate('Home')
            store.dispatch('SET_USER', {userObj: {username: val}})
        } else {
            this.loaded = true
        }
        })
    },
    props: {
        navigation: {
            type: Object,
        },
    },
    methods: {
        async SignIn() {
            const user = {
                    password: this.password,
                    username: this.username,
                }
            let test = await axios.post(`https://zuko.r4ck.tech/api/auth/signin`, user )
            if (test.status = 200){
                console.log(test.data.username)
                store.dispatch('LOGIN', {
                    userObj: {username: test.data.username},
                    navigate: this.navigation.navigate
                });
            }
            else {
                alert(test.data.message)
            }
        },
    },
};
</script>

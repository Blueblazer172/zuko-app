import Vue from 'vue-native-core';
import Vuex from 'vuex';
import * as actions from './actions';
import * as mutations from './mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
    actions,
    mutations,

    state: {
        logging_in: false,
        userObj: {}
    }
});

export default store;

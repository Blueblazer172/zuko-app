import AsyncStorage from '@react-native-async-storage/async-storage';

export function LOGIN ({ commit, state}, {userObj, navigate}) {
    commit('LOGGING_IN', true)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        commit('LOGIN_SUCCESFULL', {userObj})
        AsyncStorage.setItem('username', userObj.username)
        AsyncStorage.setItem('jwt', userObj.jwt)
        navigate('Home');
        resolve();
      }, 1000)
    })
  }
  
  export function SET_USER({commit, state}, {userObj}) {
    return commit('LOGIN_SUCCESFULL', {userObj})
  }
  
  export function LOGOUT ({ commit, state}, callback) {
    return new Promise((resolve, reject) => {
        AsyncStorage.removeItem('jwt')
        AsyncStorage.removeItem('username').then(() => {
          callback();
          resolve();
        })
    })
  }
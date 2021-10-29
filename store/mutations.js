export function LOGGING_IN (state, status) {
    state.logging_in = status;
  }
export function LOGIN_SUCCESFULL (state, {userObj}) {
state.userObj = userObj;
state.logging_in = false;
}
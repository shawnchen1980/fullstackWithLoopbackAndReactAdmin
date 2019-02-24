// in src/bitcoinSaga.js
import { put, takeEvery } from "redux-saga/effects";
import { USER_CHECK } from "react-admin";
import { actions } from "./state";
export default function* setUserSaga() {
  yield takeEvery(USER_CHECK, function*() {
    const token = JSON.parse(localStorage.getItem("lbtoken"));
    yield put(
      actions.setUser(
        token && token.value && token.value.username
          ? token.value.username
          : "unknown user"
      )
    );
  });
}

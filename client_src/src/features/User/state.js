import { createAction } from "redux-actions";
export const SET_USER = "SET_USER";
export default (previousState = "", { type, payload }) => {
  if (type === SET_USER) {
    return payload.user;
  }
  return previousState;
};
export const actions = {
  setUser: createAction(SET_USER, user => ({
    user
  }))
};

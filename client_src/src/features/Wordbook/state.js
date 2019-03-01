import { createAction } from "redux-actions";
export const SET_WORDBOOK = "SET_WORDBOOK";
export default (previousState = "", { type, payload }) => {
  if (type === SET_WORDBOOK) {
    return payload.currentWordbook;
  }
  return previousState;
};
export const actions = {
  setWordbook: createAction(SET_WORDBOOK, currentWordbook => ({
    currentWordbook
  }))
};

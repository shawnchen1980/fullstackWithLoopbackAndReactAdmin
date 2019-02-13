import { createAction } from "redux-actions";
export const SET_WORDBOOK = "SET_WORDBOOK";
export default (
  previousState = "5c62a95563f1083a406b171c",
  { type, payload }
) => {
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

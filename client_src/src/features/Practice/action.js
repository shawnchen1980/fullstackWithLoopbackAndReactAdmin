// in src/features/Practice/action.js
import { CREATE } from "react-admin";
import { createAction } from "redux-actions";

export const PRACTICE_CREATE = "PRACTICE_CREATE";
// export const commentApprove = (id, data, basePath) => ({
//   type: COMMENT_APPROVE,
//   payload: { id, data: { bookId:data.id, lastAccessed: Date.now() } },
//   meta: { fetch: UPDATE, resource: "comments" }
// });
// export const actions = {
//   createPractice: createAction(PRACTICE_CREATE, (data, basePath) => ({
//     payload: { data: { bookId: data.id, lastAccessed: Date.now() } },
//     meta: { fetch: CREATE, resource: "appusers/me/practices" }
//   }))
// };

export const createPractice = (data, basePath) => ({
  type: PRACTICE_CREATE,
  payload: { data: { bookId: data.id, lastAccessed: Date.now() } },
  meta: {
    fetch: CREATE,
    resource: "appusers/me/practices",
    onSuccess: {
      notification: {
        body: "resources.comments.notification.approved_success",
        level: "info"
      },
      redirectTo: `/testsfrombooks/${data.id}/words`,
      basePath
    },
    onFailure: {
      notification: {
        body: "resources.comments.notification.approved_failure",
        level: "warning"
      }
    }
  }
});

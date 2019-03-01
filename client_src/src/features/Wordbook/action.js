// in src/features/Wordbook/action.js
import { GET_LIST } from "react-admin";

export const BROWSE_WORDBOOK = "BROWSE_WORDBOOK";
export const browseWordbook = (data, basePath) => ({
  type: BROWSE_WORDBOOK,
  payload: {
    api_url: `wordbooks/${data.id}/words`,
    other: { bookId: data.id, lastAccessed: Date.now() },
    pagination: {},
    sort: {}
  },
  meta: {
    fetch: GET_LIST,
    resource: "Words",
    onSuccess: {
      notification: {
        body: "resources.comments.notification.approved_success",
        level: "info"
      },
      redirectTo: `/words`,
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

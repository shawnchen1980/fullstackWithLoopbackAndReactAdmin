import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY
} from "react-admin";

export default function(dataProvider) {
  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {
    let arr = resource.split("/");
    let names = ["wordsfrombooks", "testsfrombooks"];
    if (arr.length > 0 && names.includes(arr[0].toLowerCase())) {
      arr[0] = "Wordbooks";
      return dataProvider(type, arr.join("/"), params);
    }

    if (
      arr[0] &&
      arr[0].toLowerCase() === "wordbooks" &&
      (type === CREATE || type === UPDATE)
    ) {
      return dataProvider(CREATE, "wordbooks/appcreate", params);
    }
    if (
      arr[0] &&
      arr[0].toLowerCase() === "wordmappings" &&
      (type === GET_LIST || type === GET_MANY_REFERENCE)
    ) {
      return dataProvider(type, resource, {
        ...params,
        include: ["book", "word"]
      });
    }
    // if (arr[0] && arr[0].toLowerCase() === "words") {
    //   const { filter, ...newp } = params;
    //   if (!filter || !filter.api_url) {
    //     return dataProvider(type, arr[0], params);
    //   }
    //   const { api_url, ...realFilter } = filter;
    //   return dataProvider(type, api_url, { ...newp, filter: realFilter });
    // }
    return dataProvider(type, resource, params);
  };
}

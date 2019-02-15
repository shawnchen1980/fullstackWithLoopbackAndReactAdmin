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
    return dataProvider(type, resource, params);
  };
}

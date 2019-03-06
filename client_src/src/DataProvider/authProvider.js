import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_CHECK,
  AUTH_ERROR,
  AUTH_GET_PERMISSIONS
} from "react-admin";
import storage from "./storage";
import { push, replace } from "react-router-redux";

export const authProvider = (loginApiUrl, history, noAccessPage = "/login") => {
  return (type, params) => {
    console.log("type,params", type, params);
    if (type === AUTH_LOGIN) {
      const request = new Request(loginApiUrl, {
        method: "POST",
        body: JSON.stringify(params),
        headers: new Headers({ "Content-Type": "application/json" })
      });
      return fetch(request)
        .then(response => {
          if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then(({ ttl, ...data }) => {
          const username = params.username || params.email;
          data.username = username;
          storage.save("lbtoken", data, ttl);
        });
    }
    if (type === AUTH_LOGOUT) {
      storage.remove("lbtoken");
      return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
      const { status } = params;
      if (status === 401 || status === 403) {
        storage.remove("lbtoken");
        return Promise.reject({ redirectTo: noAccessPage });
        // console.log("auth error");
        // history.push("/unauthorized");
        // return Promise.resolve({ redirectTo: noAccessPage });
      }
      return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
      console.log("auth param", params);
      const token = storage.load("lbtoken");
      if (token && token.id && token.username) {
        return Promise.resolve(token.username);
      } else {
        storage.remove("lbtoken");
        // return Promise.reject({ redirectTo: noAccessPage });
        return Promise.resolve("guest");
      }
    }
    if (type === AUTH_GET_PERMISSIONS) {
      const role = localStorage.getItem("role");
      return role ? Promise.resolve(role) : Promise.resolve("guest");
    }
    return Promise.reject("Unkown method");
  };
};

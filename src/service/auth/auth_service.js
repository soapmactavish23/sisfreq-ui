import axios from "axios";
import Token  from "../../utilities/jwt/Token.js";
import Config from "./config.js";

export default class AuthService extends Config {

  login(login, password) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url: this._api_url + "oauth/token",
        withCredentials: true,
        data:
          "username=" +
          login +
          "&password=" +
          password +
          "&grant_type=password",
        headers: {
          Authorization: "Basic c2VzcGF3ZWI6IyQzJHBAY3QxJCM=",
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((res) => {
          new Token().storeToken(res.data);
          resolve();
        })
        .catch((err) => {
          const jsonStr = JSON.stringify(err);
          const jsonError = JSON.parse(jsonStr);
          reject(jsonError);
        });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      let token = sessionStorage.getItem("token");
      token = JSON.parse(token);
      axios({
        method: "delete",
        url: this._api_url + "tokens/revoke",
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + token.access_token,
        },
      })
        .then(() => {
          new Token().clearAccessToken();
          resolve();
        })
        .catch((err) => reject(err));
    });
  }
  
  refresh_token() {
    return axios({
      method: "post",
      url: this._api_url + "oauth/token",
      withCredentials: true,
      data: "grant_type=refresh_token",
      headers: {
        Authorization: "Basic c2VzcGF3ZWI6IyQzJHBAY3QxJCM=",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  }

}

import jwtDecode from "jwt-decode";
import axios from "axios";
import Config from "../../service/auth/config.js";

export default class Token extends Config {
  constructor(url, accessMethods = { c: true, r: true, u: true, d: true }) {
    super();
    (this.accessMethods = accessMethods), (this.pathUrl = url);
  }

  static getAcessMethods() {
    return {
      c: false,
      r: false,
      u: false,
      d: false,
    };
  }

  findById(id) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url: this.api_url + this.pathUrl + `/${id}`,
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + this.token(),
        },
      })
        .then((res) => resolve(res.data))
        .catch((err) => reject(err));
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.r) {
        axios({
          method: "get",
          url: this.api_url + this.pathUrl,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        }).then((res) => resolve(res.data));
      } else {
        reject("Acesso negado!");
      }
    });
  }

  create(data) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.c) {
        const result = axios({
          method: "post",
          url: this.api_url + this.pathUrl,
          data: data,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        });
        resolve(result);
      } else {
        reject("Acesso negado!");
      }
    });
  }
  createFrequency(data) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.c) {
        const result = axios({
          method: "post",
          url: this.api_url + this.pathUrl + "/criar",
          data: data,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        });
        resolve(result);
      } else {
        reject("Acesso negado!");
      }
    });
  }

  update(data) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.u) {
        const result = axios({
          method: "put",
          url: this.api_url + this.pathUrl + `/${data.id}`,
          data: data,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        });
        resolve(result);
      } else {
        reject("Acesso negado!");
      }
    });
  }

  delete(id) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.d) {
        const result = axios({
          method: "delete",
          url: this.api_url + this.pathUrl + "/" + id,
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + this.token(),
          },
        });
        resolve(result);
      } else {
        reject("Acesso negado!");
      }
    });
  }

  execute(method, params, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: method,
        url: this.api_url + this.pathUrl + params,
        withCredentials: true,
        data: data,
        headers: {
          Authorization: "Bearer " + this.token(),
        },
      })
        .then((res) => resolve(res))
        .catch((err) => reject(err));
    });
  }

  /** token expirado **/
  checkExpiredToken() {
    let token = sessionStorage.getItem("token");
    token = JSON.parse(token);
    let decodeToken = jwtDecode(token.access_token);

    let d1 = new Date(Date.now());
    let d2 = new Date(decodeToken.exp * 1000);

    if (d1 >= d2) {
      return true;
    } else {
      return false;
    }
  }

  /** limpar token **/
  clearAccessToken() {
    sessionStorage.removeItem("token");
  }

  /** armazenaToken **/
  storeToken(token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }

  /** retorna token **/
  token() {
    let token = sessionStorage.getItem("token");
    token = JSON.parse(token);
    return token.access_token;
  }

  /** decodificando jwt **/
  jwtDecode() {
    let payLoad = jwtDecode(this.token());
    return payLoad;
  }

  /** token valido **/
  checkToken() {
    return new Promise((resolve, reject) => {
      const msg = "Sessão Expirada, saia e entre novamente!";
      if (sessionStorage.getItem("token")) {
        if (this.checkExpiredToken() === true) {
          sessionStorage.removeItem("token");
          reject(msg);
        } else {
          resolve();
        }
      } else {
        reject(msg);
      }
    });
  }
}

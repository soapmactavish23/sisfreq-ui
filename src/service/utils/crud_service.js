import axios from "axios";
import AuthService from "../auth/auth_service";

export default class CrudService extends AuthService {
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

  update(data) {
    return new Promise((resolve, reject) => {
      if (this.accessMethods.u) {
        const result = axios({
          method: "put",
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
}

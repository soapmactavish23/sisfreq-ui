import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

import { gerarUrl } from "../../utilities/utils/Pageable";

export default class UserService extends Token {
  searching(queryParams) {
    queryParams = gerarUrl(queryParams);
    return axios({
      method: "get",
      url: this.api_url + "usuarios?" + queryParams,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  findById(id) {
    return axios({
      method: "get",
      url: this.api_url + "usuarios/" + id,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(user) {
    return axios({
      method: "post",
      url: this.api_url + "usuarios",
      withCredentials: true,
      data: user,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  update(user) {
    return axios({
      method: "put",
      url: this.api_url + "user/" + user.id,
      withCredentials: true,
      data: user,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  resetPassword(user) {
    return axios({
      method: "put",
      url: this.api_url + "usuarios/" + user.id + "/resetar-password",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  recoverPassword(email, param) {
    return axios({
      method: "put",
      url: this.api_url + "usuarios/" + email + "/recuperar-password",
      data: param,
    });
  }

  activateRegistration(user) {
    return axios({
      method: "put",
      url: this.api_url + "usuarios/" + user.email + "/ativar-registration",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  updatePassword(id, newPassword) {
    return axios({
      method: "put",
      url: this.api_url + "usuarios/" + id + "/alterar-password",
      withCredentials: true,
      data: newPassword,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  updateStatus(user) {
    return axios({
      method: "put",
      url: this.api_url + "user/" + user.id + "/ativo",
      withCredentials: true,
      data: user.status,
      headers: {
        Authorization: "Bearer " + this.token(),
        'Content-Type': 'application/json'
      },
    });
  }

  delete(id) {
    return axios({
      method: "delete",
      url: this.api_url + "usuarios/" + id,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
}

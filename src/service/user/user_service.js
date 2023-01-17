import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

import { gerarUrl } from "../../utilities/utils/Pageable";

export default class UserService extends Token {
  searching(queryParams) {
    queryParams = gerarUrl(queryParams);
    return axios({
      method: "get",
      url: this.api_url + "user?" + queryParams,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  findById(id) {
    return axios({
      method: "get",
      url: this.api_url + "user/" + id,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(user) {
    return axios({
      method: "post",
      url: this.api_url + "user",
      withCredentials: true,
      data: user,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  createUserAndPassword(user) {
    return axios({
      method: "post",
      url: this.api_url + "user/create",
      data: user,
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
      url: this.api_url + "user/" + user.id + "/reset-password",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  recoverPassword(email, param) {
    return axios({
      method: "put",
      url: this.api_url + "user/" + email + "/recover-password",
      data: param,
    });
  }

  activateRegistration(user) {
    return axios({
      method: "put",
      url: this.api_url + "user/" + user.email + "/activate-registration",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  updatePassword(id, newPassword) {
    return axios({
      method: "put",
      url: this.api_url + "user/" + id + "/update-password",
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
      url: this.api_url + "user/" + user.id + "/update-status",
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
      url: this.api_url + "user/" + id,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
}

import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

export default class GenderService extends Token {
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "gender",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(gender) {
    return axios({
      method: "post",
      url: this.api_url + "gender",
      withCredentials: true,
      data: gender,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  
  update(gender) {
    return axios({
      method: 'put',
      url: this.api_url + 'gender/' + gender.id,
      withCredentials: true,
      data: gender,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'gender/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

export default class LocalService extends Token {
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "local",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(local) {
    return axios({
      method: "post",
      url: this.api_url + "local",
      withCredentials: true,
      data: local,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  
  update(local) {
    return axios({
      method: 'put',
      url: this.api_url + 'local',
      withCredentials: true,
      data: local,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'local/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

export default class GroupService extends Token {
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "group-service",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(group) {
    return axios({
      method: "post",
      url: this.api_url + "group-service",
      withCredentials: true,
      data: group,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  update(group) {
    return axios({
      method: 'put',
      url: this.api_url + 'group-service/' + group.id,
      withCredentials: true,
      data: group,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'group-service/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

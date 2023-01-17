import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

export default class PermissionService extends Token {
  
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "permission",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(permission) {
    return axios({
      method: "post",
      url: this.api_url + "permission",
      withCredentials: true,
      data: permission,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  
  update(permission) {
    return axios({
      method: 'put',
      url: this.api_url + 'permission/' + permission.id,
      withCredentials: true,
      data: permission,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'permission/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

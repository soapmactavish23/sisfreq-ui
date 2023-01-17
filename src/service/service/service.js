import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

export default class ServiceService extends Token {
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "service",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(service) {
    return axios({
      method: "post",
      url: this.api_url + "service",
      withCredentials: true,
      data: service,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  
  update(service) {
    return axios({
      method: 'put',
      url: this.api_url + 'service/' + service.id,
      withCredentials: true,
      data: service,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'service/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

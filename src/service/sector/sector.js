import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

export default class SectorService extends Token {
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "setor",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(sector) {
    return axios({
      method: "post",
      url: this.api_url + "setor",
      withCredentials: true,
      data: sector,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  update(sector) {
    return axios({
      method: 'put',
      url: this.api_url + 'setor/',
      withCredentials: true,
      data: sector,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'setor/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

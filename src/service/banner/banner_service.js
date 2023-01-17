import axios from "axios";

import Token from "../../utilities/jwt/Token.js"

export default class BannerService extends Token {
  
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "banner",
    }).then((res) => res.data);
  }

  create(banner) {
    return axios({
      method: "post",
      url: this.api_url + "banner",
      withCredentials: true,
      data: banner,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  
  update(banner) {
    return axios({
      method: 'put',
      url: this.api_url + 'banner',
      withCredentials: true,
      data: banner,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'banner/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

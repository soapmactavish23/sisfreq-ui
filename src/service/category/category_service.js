import axios from "axios";

import Token from "../../utilities/jwt/Token.js"

export default class CategoryService extends Token {
  findAll() {
    return axios({
      method: "get",
      url: this.api_url + "category-service",
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  create(category) {
    return axios({
      method: "post",
      url: this.api_url + "category-service",
      withCredentials: true,
      data: category,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
  
  update(category) {
    return axios({
      method: 'put',
      url: this.api_url + 'category-service/' + category.id,
      withCredentials: true,
      data: category,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }

  delete(id) {
    return axios({
      method: 'delete',
      url: this.api_url + 'category-service/' + id,
      withCredentials: true,
      headers: {
        'Authorization': 'Bearer ' + this.token(),
      }
    });

  }
}

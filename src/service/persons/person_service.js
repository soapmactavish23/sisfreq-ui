import axios from "axios";
import Token from "../../utilities/jwt/Token.js";
import { gerarUrl } from "../../utilities/utils/Pageable";

export default class PersonService extends Token {

  searchPerson(queryParams) {
    queryParams = gerarUrl(queryParams);
    return axios({
      method: "get",
      url: this.api_url + "person?" + queryParams,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    }).then((res) => res.data);
  }

  findByCpfOrCredential(key) {
    return axios({
      method: "GET",
      url: this.api_url + "person/search?keyParam=" + key,
    }).then((res) => res.data);
  }

  create(person) {
    return axios({
      method: "post",
      url: this.api_url + "person",
      withCredentials: true,
      data: person,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  update(person) {
    return axios({
      method: "put",
      url: this.api_url + "person/" + person.id,
      withCredentials: true,
      data: person,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }

  delete(id) {
    return axios({
      method: "delete",
      url: this.api_url + "person/" + id,
      withCredentials: true,
      headers: {
        Authorization: "Bearer " + this.token(),
      },
    });
  }
}

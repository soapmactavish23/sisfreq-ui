import axios from "axios";

export default class EmailService {

    sendEmail(dados) {
        return axios({
            method: 'post',
            url: this.api_url + 'email',
            data: dados,
        });
    }
}

import axios from "axios";

import Token from "../../utilities/jwt/Token.js";

export default class PermissionService extends Token {
  
    constructor() {
      super('permissoes');
    }

}

import { createStore } from "vuex";
//import AuthService from "./service/auth/auth_service";
import Token from "./utilities/jwt/Token.js";

export default createStore({
  state() {
    return {
      userLogged: null,
      views: {
        login: {
          dialogCreate: false,
          dialogFoggetPassword: false,
        },
        users: {
          dialogForm: false,
          dialogChangePassword: false,
        },
        sector: {
          dialogForm: false,
        },
        funcionario: {
          dialogForm: false,
        },
        frequency: {
          dialogForm: false,
        },
        permission: {
          dialogForm: false,
        },
        groups: {
          dialogForm: false,
        },
      },
    };
  },
  getters: {
    getUserLogged(state) {
      return state.userLogged;
    },
  },
  mutations: {
    setUserLogged(state, token) {
      token = [
        {
          nome: token.name,
          id: token.code,
          services: token.services,
          email: token.user_name,
          authorities: token.authorities,
        },
      ];
      state.userLogged = token[0];
    },
  },
  actions: {
    setUserLogged({ commit }) {
      commit("setUserLogged", new Token().jwtDecode());
    }
  },
});
// getters: {
//   getUserLogged(state) {
//     //let authService = new AuthService();
//     state.userLogged = null;
//     let token = new Token().jwtDecode();
//     token = [
//       {
//         nome: token.name,
//         id: token.code,
//         services: token.services,
//         email: token.user_name,
//         authorities: token.authorities,
//       },
//     ];
//     return (state.userLogged = token[0]);
//   },
//
// },

<template>
  <Toast />
  <div class="grid" style="">
    <div class="col-12 lg:col-3 login full-screen">
      <div class="text-center pt-3 pb-3">
        <img
          src="../../../public/images/sespa/logoCtis.svg"
          class="mb-5 img-fluid"
          style="width: 300px; height: 200px"
        />
      </div>
      <div class="fluid">
        <form @submit.prevent="signIn" class="col-12">
          <div class="h-full w-full m-0 py-7 px-4 shadow-1">
            <div class="w-full md:w-10 mx-auto">
              <label for="login" class="block text-900 text-xl font-medium mb-2"
                >Login</label
              >
              <InputText
                id="login"
                v-model="user.login"
                type="text"
                class="w-full mb-3"
                placeholder="Digite seu Login"
                style="padding: 1rem"
                required
              />
              <label
                for="password1"
                class="block text-900 font-medium text-xl mb-2"
                >Senha</label
              >
              <Password
                id="password1"
                v-model="user.password"
                placeholder="Digite sua senha"
                :toggleMask="true"
                :feedback="false"
                class="w-full mb-3"
                inputClass="w-full"
                inputStyle="padding:1rem"
                required
              ></Password>

              <div class="flex align-items-center justify-content-between mb-5">
                <a
                  class="font-medium no-underline ml-2 text-left cursor-pointer"
                  style="color: var(--primary-color)"
                  @click="onCreateUser"
                  >Cadastrar-se</a
                >
                <a
                  class="
                    font-medium
                    no-underline
                    ml-2
                    text-right
                    cursor-pointer
                  "
                  style="color: var(--primary-color)"
                  @click="onFoggetPassword"
                  >Esqueceu a senha?</a
                >
              </div>
              <Button
                label="Entrar"
                class="w-full p-3 text-xl"
                type="submit"
              ></Button>
            </div>
          </div>
          <div class="text-center mb-6">
            <img
              src="../../../public/images/sespa/brasaoSespa.png"
              alt="Image"
              height="60"
              class="img-footer"
            />
          </div>
        </form>
      </div>
    </div>

    <div class="col-9 painelDiv">
      <div class="shadow-4 painel text-center">
        <Carrousel />
        <DialogCreate />
        <DialogFoggetPassword />
      </div>
    </div>
  </div>
</template>

<script>
//Models
import Users from "../../models/users";

//Services
import AuthService from "../../service/auth/auth_service";

//Components
// import AppConfig from "../../components/menu/AppConfig.vue";
import Carrousel from "./components/Carrousel.vue";
import DialogCreate from "./components/DialogCreate.vue";
import DialogFoggetPassword from "./components/DialogFoggetPassword.vue";

export default {
  components: {
    // AppConfig,
    Carrousel,
    DialogCreate,
    DialogFoggetPassword,
  },
  data() {
    return {
      authService: new AuthService(),
      user: new Users(),
    };
  },
  created() {
    if (sessionStorage.getItem("token")) {
      this.$Token.checkToken();
      this.$router.push("/system");
    } else {
      this.$router.push("/");
    }
  },
  methods: {
    signIn() {
      this.authService
        .login(this.user.login, this.user.password)
        .then(() => this.$router.push("/system"))
        .catch((error) => {
          this.$toast.add({
            severity: "error",
            summary: "Alerta!",
            detail: "Login ou senha incorretos!",
            life: 6000,
          });
          console.error(error.message);
        });
    },
    onCreateUser() {
      this.$store.state.views.login.dialogCreate = true;
    },
    onFoggetPassword() {
      this.$store.state.views.login.dialogFoggetPassword = true;
    },
  },
};
</script>

<style scoped>
.full-screen {
  height: 99vh;
  overflow: auto;
}

.grid {
  padding: 0;
  margin: 0;
}

.layout-footer {
  background-color: #dddddd;
  box-shadow: 0px 6px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  bottom: 0;
}

.painel {
  height: 98vh;
  background-image: linear-gradient(to bottom right, #076aa5, #297aae);
  /* background-image: url("../public/assets/layout/images/sespa/fundo03.svg"); */
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 0;
  margin: 0;
}

.pi-eye {
  transform: scale(1.6);
  margin-right: 1rem;
}

.pi-eye-slash {
  transform: scale(1.6);
  margin-right: 1rem;
}

@media screen and (max-width: 992px) {
  .painelDiv {
    display: none !important;
  }
  .img-footer {
    margin-top: 40px;
  }
}

@media screen and (min-width: 992px) {
  .img-footer {
    position: relative;
    left: 3px;
    top: 202px;
  }
}

.login {
  background-color: white;
  background-image: radial-gradient(#f8f8f8, #ffffff);
}
</style>

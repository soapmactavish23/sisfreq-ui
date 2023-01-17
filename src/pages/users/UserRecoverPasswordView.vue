<template>
  <Toast />
  <div
    class="
      surface-0
      flex
      align-items-center
      justify-content-center
      min-h-screen min-w-screen
      overflow-hidden
    "
  >
    <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
      <div class="col-12 mt-5 xl:mt-0 text-center">
        <img
          src="../../../public/images/sespa/brasaoSespa.png"
          alt="Sakai logo"
          class="mb-5"
          style="width: 250px; height: 80px"
        />
      </div>
      <div
        class="col-12 xl:col-6"
        style="
          padding: 0.3rem;
          background: linear-gradient(
            rgba(33, 150, 243, 0.4) 100%,
            rgba(33, 150, 243, 0) 100%
          );
        "
      >
        <div
          class="flex justify-content-center h-full w-full m-0 py-7 px-4"
          style="
            background: linear-gradient(
              180deg,
              var(--surface-50) 38.9%,
              var(--surface-0)
            );
          "
        >
          <div class="grid flex-column align-items-center">
            <span class="text-blue-500 font-bold text-3xl"
              >Olá, {{ email }}.
            </span>
            <h1 class="text-900 font-bold text-3xl lg:text-5xl mb-2">
              Verificamos que voçê perdeu sua senha! :(
            </h1>
            <span class="text-gray-600"
              >Preencha o formulário abaixo para recuperação.</span
            >
            <div style="min-width: 50%">
              <div
                class="
                  col-12
                  flex
                  align-items-center
                  py-5
                  border-300 border-bottom-1
                "
              >
                <div
                  class="
                    flex
                    justify-content-center
                    align-items-center
                    bg-orange-400
                    border-round
                  "
                  style="height: 3.5rem; width: 3.5rem"
                >
                  <i class="pi pi-fw pi-shield text-50 text-2xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-900 lg:text-xl font-medium mb-0">
                    <InputText
                      inputId="hashCode"
                      class="p-inputtext-lg"
                      v-model="recoverPassword.hashCode"
                      placeholder="Código de Recuperação"
                    />
                  </p>
                </div>
              </div>
              <div
                class="
                  col-12
                  flex
                  align-items-center
                  py-5
                  border-300 border-bottom-1
                "
              >
                <div
                  class="
                    flex
                    justify-content-center
                    align-items-center
                    bg-blue-500
                    border-round
                  "
                  style="height: 3.5rem; width: 3.5rem"
                >
                  <i class="pi pi-fw pi-unlock text-50 text-2xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-900 lg:text-xl font-medium mb-0">
                    <Password
                      v-model="recoverPassword.newPassword1"
                      class="p-inputtext-lg"
                      placeholder="Nova Senha"
                    >
                      <template #header>
                        <h6>Escolha uma senha</h6>
                      </template>
                      <template #footer="sp">
                        {{ sp.level }}
                        <Divider />
                        <p class="mt-2">Sugestões</p>
                        <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
                          <li>Pelo menos uma minúscula.</li>
                          <li>Pelo menos uma maiúscula</li>
                          <li>Pelo menos um número</li>
                          <li>Mínimo de 6 caracteres</li>
                        </ul>
                      </template>
                    </Password>
                  </p>
                </div>
              </div>
              <div
                class="
                  col-12
                  flex
                  align-items-center
                  py-5
                  border-300 border-bottom-1
                "
              >
                <div
                  class="
                    flex
                    justify-content-center
                    align-items-center
                    bg-blue-500
                    border-round
                  "
                  style="height: 3.5rem; width: 3.5rem"
                >
                  <i class="pi pi-fw pi-unlock text-50 text-2xl"></i>
                </div>
                <div class="ml-4">
                  <p class="text-900 lg:text-xl font-medium mb-0">
                    <Password
                      v-model="recoverPassword.newPassword2"
                      class="p-inputtext-lg"
                      placeholder="Confirmar Nova Senha"
                    />
                  </p>
                </div>
              </div>
              <div class="col-12 flex align-items-center py-5">
                <Button
                  label="Recuperar"
                  class="w-full p-3 text-xl"
                  @click="send"
                  :disabled="
                    !recoverPassword.hashCode ||
                    !recoverPassword.newPassword1 ||
                    !recoverPassword.newPassword2
                  "
                ></Button>
              </div>
              <div class="col-12 mt-5 text-center">
                <i
                  class="pi pi-fw pi-arrow-left text-blue-500 mr-2"
                  style="vertical-align: center"
                ></i>
                <router-link to="/" class="text-blue-500">Voltar</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//Services
import UsersService from "../../service/user/user_service";

export default {
  data() {
    return {
      email: this.$route.query.email,
      recoverPassword: {
        hashCode: null,
        newPassword1: null,
        newPassword2: null,
      },
      userService: new UsersService(),
    };
  },
  created() {
    if (!this.email) {
      this.$router.push("/");
    }
  },
  methods: {
    send() {
      //console.log(this.recoverPassword);
      this.userService
        .recoverPassword(this.email, this.recoverPassword)
        .then((data) => {
          this.$msgSuccess(data);
          setTimeout(() => this.$router.push("/"), 5000);
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 40em) {
  h1 {
    font-size: 25px;
  }
  h4 {
    font-size: 18px;
  }
}
@media screen and (max-width: 70em) {
  h1 {
    font-size: 25px;
  }
  h2 {
    font-size: 18px;
  }
}
</style>
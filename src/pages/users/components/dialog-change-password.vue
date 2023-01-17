<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '400px' }"
    header="Alterar senha"
    :modal="true"
    @hide="hideDialog"
  >
    <div class="p-fluid p-formgrid p-grid">
      <div class="field p-col-12">
        <label for="senhaAtual">Senha Atual</label>
        <Password
          v-model="altPassword.oldPassword"
          :feedback="false"
          toggleMask="true"
          autofocus
          placeholder="Digite sua senha atual"
        ></Password>
      </div>
    </div>
    <div class="p-fluid p-formgrid p-grid">
      <div class="field p-col-12">
        <label for="nome">Nova Senha</label>
        <Password
          v-model="altPassword.newPassword1"
          :feedback="true"
          toggleMask
          placeholder="Digite sua nova senha"
        >
          <template #footer="sp">
            {{ sp.level }}
            <br />
            <p class="mt-2">Sugestões:</p>
            <ul class="pl-2 ml-2 mt-0" style="line-height: 1.2">
              <li>Pelo menos uma minúscula.</li>
              <li>Pelo menos uma maiúscula.</li>
              <li>Pelo menos um numérico.</li>
              <li>Mínimo de 8 caracteres.</li>
            </ul>
          </template>
        </Password>
      </div>
    </div>
    <div class="p-fluid p-formgrid p-grid">
      <div class="field p-col-12">
        <label for="nome">Confirmar Nova Senha</label>
        <Password
          v-model="altPassword.newPassword2"
          :feedback="false"
          toggleMask="true"
          placeholder="Confirme sua nova senha"
        ></Password>
      </div>
    </div>
    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button p-button-text"
        @click="hideDialog"
      />
    </template>
  </Dialog>
</template>
<script>
//Services
import UsersService from "../../../service/user/user_service";

export default {
  props: ["user"],
  data() {
    return {
      submitted: false,
      altPassword: {
        oldPassword: null,
        newPassword1: null,
        newPassword2: null,
      },
      userService: new UsersService(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        return this.$store.state.views.users.dialogChangePassword;
      },
      set(value) {
        this.$store.state.views.users.dialogChangePassword = value;
      },
    },
  },
  methods: {
    send() {
      this.userService
        .updatePassword(this.user.id, this.altPassword)
        .then((data) => {
          if (data.status === 204) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Senha alterada com sucesso.",
              life: 6000,
            });
            this.hideDialog();
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$msgWarn(null);
          } else {
            this.$toast.add({
              severity: "error",
              summary: "Erro!",
              detail: "Erro ao alterar senha do usuário.",
              life: 6000,
            });
          }
        });
    },
    hideDialog() {
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
      this.altPassword = {
        oldPassword: null,
        newPassword1: null,
        newPassword2: null,
      };
    },
  },
};
</script>
<style scoped></style>

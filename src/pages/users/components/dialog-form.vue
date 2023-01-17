<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '920px' }"
    header="Fomulário de Usuários"
    :modal="true"
    @hide="hideDialog"
  >
    <div class="p-fluid formgrid grid p-2">
      <div class="field col-12 md:col-6">
        <label for="nome">Nome</label>
        <InputText
          id="nome"
          v-model="v$.user.nome.$model"
          maxlength="255"
          placeholder="Digite o nome"
          :class="{
            'p-invalid': submitted && v$.user.nome.$invalid,
          }"
        />
        <small class="p-error" v-if="submitted && v$.user.nome.$invalid"
          >Nome é obrigatório.</small
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="email">E-mail</label>
        <InputText
          id="email"
          v-model="v$.user.email.$model"
          maxlength="255"
          placeholder="Digite o e-mail"
          :class="{ 'p-invalid': submitted && v$.user.email.$invalid }"
        />
        <small
          v-if="submitted && v$.user.email.email.$invalid"
          class="p-invalid"
          >Email inválido</small
        >
        <small class="p-error" v-else-if="submitted && v$.user.email.$invalid"
          >Email é obrigatório.</small
        >
      </div>
      <div class="field col-12 md:col-6" v-if="!user.id">
        <label for="senha">Senha</label>
        <InputText
          id="senha"
          v-model="v$.user.senha.$model"
          maxlength="255"
          placeholder="Digite sua senha"
          :class="{ 'p-invalid': submitted && !v$.user.senha.$model }"
        />
        <small v-if="submitted && !v$.user.senha.$model" class="p-error"
          >Senha é obrigatório.</small
        >
        <small
          v-else-if="submitted && v$.user.senha.minLength.$invalid"
          class="p-error"
          >A senha deve ter no mínimo 6 caracteres</small
        >
      </div>
      <div class="field col-12 md:col-6" v-if="!user.id">
        <label for="password">Confirmar senha</label>
        <InputText
          id="password"
          v-model="confirmPassword"
          maxlength="255"
          placeholder="Confirme sua senha"
          :class="{
            'p-invalid': submitted && confirmPassword !== user.senha,
          }"
        />
        <small
          class="p-error"
          v-if="submitted && confirmPassword !== user.senha"
          >As senhas devem ser iguais</small
        >
      </div>
      <div class="field col-12">
        <!-- TODO: LIST GROUPS -->
        <label for="grupo">Grupos</label>
        <Dropdown
          id="grupo"
          v-model="v$.user.grupo.$model"
          :options="groups"
          optionLabel="description"
          placeholder="Selecione um grupo"
          :class="{
            'p-invalid': submitted && v$.user.grupo.$invalid,
          }"
        />
        <small class="p-error" v-if="submitted && v$.user.grupo.$invalid"
          >Grupo é obrigatório.</small
        >
      </div>
    </div>
    <br />
    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.user.$invalid)"
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
//Models
import Usuario from "../../../models/usuario";

//Services
import UsersService from "../../../service/user/user_service";
import GroupService from "../../../service/group/group_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["userSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      user: new Usuario(),
      submitted: false,
      confirmPassword: null,
      userService: new UsersService(),
      groupService: new GroupService(),
      groups: [],
    };
  },
  mounted() {
    this.findGroups();
  },
  validations() {
    return {
      user: new Usuario().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.users.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.users.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.user.id) {
          this.update();
        } else {
          this.create();
        }
      } else {
        return;
      }
    },
    create() {
      this.userService
        .create(this.user)
        .then((data) => {
          if (data.status === 201) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro cadastrado com sucesso.",
              life: 3000,
            });
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    update() {
      this.user.senha = "12345678910";
      this.userService
        .update(this.user)
        .then((data) => {
          if (data.status === 200) {
            this.$toast.add({
              severity: "success",
              summary: "Alerta!",
              detail: "Registro alterado com sucesso.",
              life: 3000,
            });
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    hideDialog() {
      this.user = new Usuario();
      this.confirmPassword = null;
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      if (this.userSelected) {
        this.user = this.userSelected;
      }
    },
    findGroups() {
      this.groupService.findAll().then((data) => {
        this.groups = data;
      });
    },
    getPerson() {
      this.personService
        .findByCpfOrCredential(this.user.person.credential)
        .then((res) => {
          this.user.person = res;
        })
        .catch((error) => {
          this.$msgErro(error);

          /*if (error.response.status === 404) {
            this.$toast.add({
              severity: "error",
              summary: "Alerta de Erro.",
              detail: "Registro não encontrado.",
              life: 6000,
            });

          
          } else {
            this.$msgErro(error);
          }
            */
        });
    },
  },
};
</script>
<style scoped></style>

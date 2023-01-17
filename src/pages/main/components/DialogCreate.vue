<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: widthDialog }"
    header="Cadastro de usuário"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field text-center">
      <h5>SELECIONE O TIPO DE BUSCA</h5>
      <InputSwitch v-model="typeSearch" />
    </div>
    <hr />
    <div class="field" v-if="!typeSearch">
      <label for="credential">Matricula</label>
      <InputText
        id="credential"
        v-model="person.credential"
        maxlength="10"
        placeholder="Digite a Matricula"
      />
    </div>
    <div class="field" v-else>
      <label for="cpf">CPF</label>
      <InputMask
        mask="999.999.999-99"
        id="cpf"
        v-model="person.cpf"
        placeholder="Digite a CPF"
      />
    </div>
    <hr />
    <div v-if="showDetails">
      <details-person :person="person" />
      <br />
      <details-address :person="person" />
      <br />
      <Fieldset legend="Criar senha">
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-6">
            <label for="email">E-mail</label>
            <InputText
              id="email"
              type="email"
              v-model="v$.user.email.$model"
              maxlength="255"
              placeholder="Digite o email"
              :class="{
                'p-invalid': submitted && v$.user.email.email.$invalid,
              }"
            />
            <small
              class="p-invalid"
              v-if="submitted && v$.user.email.email.$invalid"
              >Digite um e-mail válido.</small
            >
          </div>
          <div class="field col-12 md:col-6">
            <label for="login">Login</label>
            <InputText
              id="login"
              v-model="v$.user.login.$model"
              maxlength="50"
              placeholder="Digite o Login"
              :class="{ 'p-invalid': submitted && !v$.user.login.$model }"
            />
            <small class="p-invalid" v-if="submitted && !v$.user.login.$model"
              >Login é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-6">
            <label for="password">Senha</label>
            <InputText
              id="password"
              v-model="v$.user.password.$model"
              maxlength="255"
              type="password"
              placeholder="Digite o Senha"
              :class="{ 'p-invalid': submitted && !v$.user.password.$model }"
            />
            <small
              class="p-invalid"
              v-if="submitted && !v$.user.password.$model"
              >Senha é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-6">
            <label for="password">Confirmar Senha</label>
            <InputText
              id="password"
              v-model="confirmPasword"
              maxlength="255"
              type="password"
              placeholder="Confirme sua Senha"
              :class="{
                'p-invalid':
                  submitted && confirmPasword !== v$.user.password.$model,
              }"
            />
            <small
              class="p-invalid"
              v-if="submitted && confirmPasword !== v$.user.password.$model"
              >As senhas devem ser iguais</small
            >
          </div>
        </div>
      </Fieldset>
    </div>

    <template #footer>
      <Button
        label="Pesquisar"
        class="p-button"
        icon="pi pi-search"
        @click="searchPerson"
      />
      <Button
        label="Salvar"
        class="p-button-success"
        icon="pi pi-check"
        v-if="showDetails"
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
import Users from "../../../models/usuarios";

//Services
import UsersService from "../../../service/user/user_service";

// Components

//VALIDATIONS
import { sameAs } from "@vuelidate/validators";
import { useVuelidate } from "@vuelidate/core";

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  components: { detailsPerson, DetailsAddress },
  data() {
    return {
      person: new Person(),
      user: new Users(),
      submitted: false,
      confirmPasword: null,
      userService: new UsersService(),
      personService: new PersonService(),
      typeSearch: false,
      showDetails: false,
      widthDialog: "480px",
      sameAs,
    };
  },
  validations() {
    return {
      user: this.user.validationsCreate(),
      confirmPassword: this.sameAs(this.user.password),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        return this.$store.state.views.login.dialogCreate;
      },
      set(value) {
        this.$store.state.views.login.dialogCreate = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      //console.log(isFormValid);
      if (isFormValid) {
        this.userService
          .createUserAndPassword(this.user)
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
      } else {
        return;
      }
    },
    searchPerson() {
      let key =
        this.person.credential != null
          ? this.person.credential
          : this.person.cpf;
      this.personService
        .findByCpfOrCredential(key)
        .then((data) => {
          this.person = data;
          this.user.person = this.person;
          this.user.login = this.person.credential;
          this.user.group = [{ id: 2 }];
          this.widthDialog = "920px";
          this.showDetails = true;
        })
        .catch((error) => {
          console.error(error);
          this.$toast.add({
            severity: "error",
            summary: "Alerta de Erro.",
            detail: "Registro não encontrado",
            life: 6000,
          });
        });
    },
    hideDialog() {
      this.person = new Person();
      this.user = new Users();
      this.submitted = false;
      this.typeSearch = false;
      this.showDetails = false;
      this.widthDialog = "480px";
      this.visibleDialog = false;
    },
  },
};
</script>
<style scoped></style>

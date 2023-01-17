<template>
  <form class="p-grid" @submit.prevent="saveUser(!v$.user.person.$invalid)">
    <Card class="p-col-12">
      <template #title>
        <h1>Perfil do Usuário</h1>
      </template>

      <template #content>
        <Fieldset legend="Dados pessoais">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-6">
              <label for="name">Nome</label>
              <InputText
                id="name"
                v-model="v$.user.person.name.$model"
                maxlength="255"
                placeholder="Digite o nome"
                :class="{
                  'p-invalid': submitted && v$.user.person.name.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.name.$invalid"
                >Nome é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-6">
              <label for="cpf">CPF</label>
              <InputMask
                id="cpf"
                v-model="v$.user.person.cpf.$model"
                placeholder="Digite o cpf"
                mask="999.999.999-99"
                :class="{
                  'p-invalid': submitted && v$.user.person.cpf.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.cpf.$invalid"
                >CPF é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-6">
              <label for="dtBirdate">Data de nascimento</label>
              <InputText
                id="dtBirdate"
                v-model="v$.user.person.dtBirdate.$model"
                type="date"
                :class="{
                  'p-invalid': submitted && v$.user.person.dtBirdate.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.dtBirdate.$invalid"
                >Data de nascimento é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-6">
              <label for="contact">Contato</label>
              <InputMask
                id="contact"
                v-model="v$.user.person.contact.$model"
                mask="(99)99999-9999"
                placeholder="(99)99999-9999"
                :class="{
                  'p-invalid': submitted && v$.user.person.contact.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.contact.$invalid"
                >Contato é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-6">
              <label for="credential">Matrícula</label>
              <InputText
                id="credential"
                v-model="user.person.credential"
                placeholder="Digite a matrícula"
                maxlength="10"
                disabled
              />
            </div>
            <div class="field col-12 md:col-6">
              <label for="gender">Gênero</label>
              <Dropdown
                id="gender"
                v-model="user.person.gender"
                optionLabel="name"
                :options="genders"
                placeholder="Selecione o gênero"
              />
            </div>
          </div>
        </Fieldset>
        <br />
        <Fieldset legend="Endereço">
          <div class="p-fluid formgrid grid">
            <div class="field col-12 md:col-4">
              <label for="cep">CEP</label>
              <InputMask
                id="cep"
                v-model="v$.user.person.address.cep.$model"
                mask="99999-999"
                placeholder="Digite o CEP"
                :class="{
                  'p-invalid': submitted && v$.user.person.address.cep.$invalid,
                }"
                @change="findAddress()"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.address.cep.$invalid"
                >CEP é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-4">
              <label for="district">Bairro</label>
              <InputText
                id="district"
                v-model="v$.user.person.address.district.$model"
                maxlength="100"
                placeholder="Digite o bairro"
                :class="{
                  'p-invalid':
                    submitted && v$.user.person.address.district.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.address.district.$invalid"
                >Bairro é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-4">
              <label for="city">Cidade</label>
              <InputText
                id="city"
                v-model="v$.user.person.address.city.$model"
                maxlength="100"
                placeholder="Digite o cidade"
                :class="{
                  'p-invalid':
                    submitted && v$.user.person.address.city.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.address.city.$invalid"
                >Cidade é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-4">
              <label for="street">Rua</label>
              <InputText
                id="street"
                v-model="v$.user.person.address.street.$model"
                maxlength="100"
                placeholder="Digite o rua"
                :class="{
                  'p-invalid':
                    submitted && v$.user.person.address.street.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.address.street.$invalid"
                >Rua é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-4">
              <label for="complement">Complemento</label>
              <InputText
                id="complement"
                v-model="user.person.address.complement"
                maxlength="200"
                placeholder="Digite o complemento"
              />
            </div>
            <div class="field col-12 md:col-2">
              <label for="complement">Número</label>
              <InputText
                id="complement"
                v-model="user.person.address.number"
                maxlength="15"
                placeholder="Número"
                :class="{
                  'p-invalid':
                    submitted && v$.user.person.address.number.$invalid,
                }"
              />
              <small
                class="p-error"
                v-if="submitted && v$.user.person.address.number.$invalid"
                >Número é obrigatório.</small
              >
            </div>
            <div class="field col-12 md:col-2">
              <label for="state">Estado</label>
              <InputText
                id="state"
                v-model="v$.user.person.address.state.$model"
                maxlength="2"
                placeholder="UF"
                :class="{
                  'p-invalid':
                    submitted && v$.user.person.address.state.$invalid,
                }"
              />
              <small
                v-if="
                  submitted && v$.user.person.address.state.minLength.$invalid
                "
                class="p-invalid"
                >Estado inválido. Mínimo 2 caracteres</small
              >
              <small
                class="p-error"
                v-else-if="submitted && v$.user.person.address.state.$invalid"
                >Estado é obrigatório.</small
              >
            </div>
          </div>
        </Fieldset>

        <!-- <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-6">
            <label for="name">Nome</label>
            <InputText
              id="name"
              v-model="usuario.nome"
              placeholder="Digite seu nome e sobrenome."
              required
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="login">Login</label>
            <InputText id="login" v-model="user.login" required />
          </div>
          <div class="field col-12 md:col-6">
            <label for="cpf">CPF</label>
            <InputText
              id="cpf"
              v-model="user.user.person.cpf"
              mask="999.999.999-99"
              required
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="email">E-mail</label>
            <InputText id="email" v-model="user.email" required type="email" />
          </div>
          <div class="field col-12 md:col-6">
            <label for="contact">Contato</label>
            <InputText id="contact" v-model="user.user.person.contact" required />
          </div>
          <div class="field col-12 md:col-6">
            <label for="dtCreate">Data de Nascimento</label>
            <InputText 
              id="dtCreated"
              v-model="user.user.person.dtBirdate"
              type="date"
              dateFormat="dd-mm-yy"
            />
          </div>
          <div class="field col-12 md:col-6">
            <label for="gender">Gênero</label>
            <Dropdown
              id="gender"
              v-model="user.user.person.gender"
              optionLabel="name"
              :options="genders"
            />
          </div>
          <hr />
        </div> -->
      </template>

      <template #footer>
        <Button
          label="Salvar"
          icon="pi pi-save"
          type="submit"
          style="margin-left: 0.5em"
        />
      </template>
    </Card>
  </form>
</template>

<script>
//Models
import User from "../../models/users";
import Person from "../../models/person";

//Services
import AuthService from "../../service/auth/auth_service";
import UserService from "../../service/user/user_service";
import PersonService from "../../service/persons/person_service";
import GroupService from "../../service/group/group_service";
import GenderService from "../../service/gender/gender";
import { getCep } from "../../service/utils/via_cep";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  components: {},
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      authService: new AuthService(),
      userService: new UserService(),
      groupService: new GroupService(),
      genderService: new GenderService(),
      personService: new PersonService(),
      user: new User(),
      groups: [],
      genders: [],
      getCep,
      submitted: false,
    };
  },
  computed: {
    usuario: {
      get() {
        //console.log("estou aqui2");
        //console.log(this.$store.getters.getUserLogged);
        return this.$store.getters.getUserLogged;
      },
    },
  },
  create() {},
  mounted() {
    this.userService.findById(this.usuario.id).then((data) => {
      this.user = data;
      let oldDate = this.user.person.dtBirdate;
      let newDate = this.$DateTime.formatarDateInput(oldDate);
      this.user.person.dtBirdate = newDate;
    });
    this.findGenders();
  },
  validations() {
    return {
      user: {
        person: new Person().validations(),
      },
    };
  },
  methods: {
    saveUser(isFormValid) {
      // this.user.password = "12345678910";
      this.submitted = true;
      if (isFormValid) {
        this.personService
          .update(this.user.person)
          .then((data) => {
            if (data.status === 200) {
              this.$msgSuccess(data);
            }
          })
          .catch((error) => {
            this.$msgErro(error);
          });
      } else {
        return;
      }
    },

    findGenders() {
      this.genderService
        .findAll()
        .then((response) => {
          this.genders = response;
        })
        .catch((error) => this.$msgErro(error));
    },

    findAddress() {
      this.getCep(this.user.person.address)
        .then((address) => {
          this.user.person.address = address;
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "Alerta!",
            detail: err,
            life: 6000,
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped></style>

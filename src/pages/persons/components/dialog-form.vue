<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '920px' }"
    header="Fomulário de Pessoas"
    :modal="true"
    @hide="hideDialog"
  >
    <Fieldset legend="Dados pessoais">
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-6">
          <label for="name">Nome</label>
          <InputText
            id="name"
            v-model="v$.person.name.$model"
            maxlength="255"
            placeholder="Digite o nome"
            :class="{ 'p-invalid': submitted && v$.person.name.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.person.name.$invalid"
            >Nome é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="cpf">CPF</label>
          <InputMask
            id="cpf"
            v-model="v$.person.cpf.$model"
            placeholder="Digite o cpf"
            mask="999.999.999-99"
            :class="{ 'p-invalid': submitted && v$.person.cpf.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.person.cpf.$invalid"
            >CPF é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="dtBirdate">Data de nascimento</label>
          <InputText
            id="dtBirdate"
            v-model="v$.person.dtBirdate.$model"
            type="date"
            :class="{ 'p-invalid': submitted && v$.person.dtBirdate.$invalid }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.dtBirdate.$invalid"
            >Data de nascimento é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="contact">Contato</label>
          <InputMask
            id="contact"
            v-model="v$.person.contact.$model"
            mask="(99)99999-9999"
            placeholder="Digite o contato"
            :class="{ 'p-invalid': submitted && v$.person.contact.$invalid }"
          />
          <small class="p-error" v-if="submitted && v$.person.contact.$invalid"
            >Contato é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="credential">Matrícula</label>
          <InputText
            id="credential"
            v-model="v$.person.credential.$model"
            placeholder="Digite a matrícula"
            maxlength="10"
            :class="{ 'p-invalid': submitted && v$.person.credential.$invalid }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.credential.$invalid"
            >Matrícula é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="gender">Gênero</label>
          <Dropdown
            id="gender"
            v-model="v$.person.gender.$model"
            optionLabel="name"
            :options="genders"
            placeholder="Selecione o gênero"
            :class="{
              'p-invalid': submitted && v$.person.gender.name.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.gender.name.$invalid"
            >Gênero é obrigatório.</small
          >
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
            v-model="v$.person.address.cep.$model"
            mask="99999-999"
            placeholder="Digite o CEP"
            :class="{
              'p-invalid': submitted && v$.person.address.cep.$invalid,
            }"
            @change="findAddress()"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.address.cep.$invalid"
            >CEP é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-4">
          <label for="district">Bairro</label>
          <InputText
            id="district"
            v-model="v$.person.address.district.$model"
            maxlength="100"
            placeholder="Digite o bairro"
            :class="{
              'p-invalid': submitted && v$.person.address.district.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.address.district.$invalid"
            >Bairro é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-4">
          <label for="city">Cidade</label>
          <InputText
            id="city"
            v-model="v$.person.address.city.$model"
            maxlength="100"
            placeholder="Digite o cidade"
            :class="{
              'p-invalid': submitted && v$.person.address.city.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.address.city.$invalid"
            >Cidade é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-4">
          <label for="street">Rua</label>
          <InputText
            id="street"
            v-model="v$.person.address.street.$model"
            maxlength="100"
            placeholder="Digite o rua"
            :class="{
              'p-invalid': submitted && v$.person.address.street.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.address.street.$invalid"
            >Rua é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-4">
          <label for="complement">Complemento</label>
          <InputText
            id="complement"
            v-model="person.address.complement"
            maxlength="200"
            placeholder="Digite o complemento"
          />
        </div>
        <div class="field col-12 md:col-2">
          <label for="complement">Número</label>
          <InputText
            id="complement"
            v-model="v$.person.address.number.$model"
            maxlength="100"
            placeholder="Número"
            :class="{
              'p-invalid': submitted && v$.person.address.number.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.person.address.number.$invalid"
            >Número é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-2">
          <label for="state">Estado</label>
          <InputText
            id="state"
            v-model="v$.person.address.state.$model"
            maxlength="2"
            placeholder="UF"
            :class="{
              'p-invalid': submitted && v$.person.address.state.$invalid,
            }"
          />
          <small
            v-if="submitted && v$.person.address.state.minLength.$invalid"
            class="p-invalid"
            >Estado inválido. Mínimo 2 caracteres</small
          >
          <small
            class="p-error"
            v-if="submitted && v$.person.address.state.$invalid"
            >Estado é obrigatório.</small
          >
        </div>
      </div>
    </Fieldset>
    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.person.$invalid)"
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
import Person from "../../../models/person";

//Services
import PersonService from "../../../service/persons/person_service";
import GenderService from "../../../service/gender/gender";
import { getCep } from "../../../service/utils/via_cep";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["personSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      person: new Person(),
      submitted: false,
      personService: new PersonService(),
      genders: [],
      genderService: new GenderService(),
      getCep,
    };
  },
  mounted() {
    this.findGenders();
  },
  created() {},
  validations() {
    return {
      person: new Person().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.persons.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.persons.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.person.id) {
          this.update();
        } else {
          this.create();
        }
      } else {
        return;
      }
    },
    create() {
      this.submitted = true;
      this.personService
        .create(this.person)
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
      this.submitted = true;
      this.personService
        .update(this.person)
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
      this.person = new Person();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      if (this.personSelected) {
        this.person = this.personSelected;
        this.person.dtBirdate = this.$DateTime.formatarDateInput(
          this.person.dtBirdate
        );
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
      this.getCep(this.person.address)
        .then((address) => {
          this.person.address = address;
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
<style scoped></style>

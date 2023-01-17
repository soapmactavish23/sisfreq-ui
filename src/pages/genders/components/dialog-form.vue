<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '480px' }"
    header="Fomulário de Gêneros"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Nome</label>
      <InputText
        id="name"
        v-model="v$.gender.name.$model"
        maxlength="100"
        placeholder="Digite o gênero"
        :class="{ 'p-invalid': submitted && v$.gender.name.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.gender.name.$invalid"
        >Nome é obrigatório.</small
      >
    </div>
    <div class="field">
      <label for="description">Descrição</label>
      <InputText
        id="description"
        v-model="gender.description"
        maxlength="45"
        placeholder="Digite a descrição"
      />
    </div>

    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.gender.$invalid)"
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
import Gender from "../../../models/gender";

//Services
import GenderService from "../../../service/gender/gender";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["genderSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      gender: new Gender(),
      submitted: false,
      genderService: new GenderService(),
    };
  },
  created() {},
  validations() {
    return {
      gender: new Gender().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.gender.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.gender.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.gender.id) {
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
      this.genderService
        .create(this.gender)
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
      this.genderService
        .update(this.gender)
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
      this.gender = new Gender();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.gender = this.genderSelected;
    },
  },
};
</script>
<style scoped></style>

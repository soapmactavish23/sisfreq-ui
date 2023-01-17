<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '480px' }"
    header="Fomulário de Setores"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Nome</label>
      <InputText
        id="name"
        v-model="v$.sector.name.$model"
        maxlength="255"
        placeholder="Digite o nome do setor"
        :class="{ 'p-invalid': submitted && v$.sector.name.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.sector.name.$invalid"
        >Nome do setor é obrigatório.</small
      >
    </div>
    <div class="field">
      <label for="acronym">Sigla</label>
      <InputText
        id="acronym"
        v-model="sector.acronym"
        maxlength="50"
        placeholder="Digite a sigla do setor"
      />
    </div>
    <div class="field">
      <label for="local">Local</label>
      <Dropdown
        id="local"
        v-model="v$.sector.local.$model"
        optionLabel="name"
        :options="locals"
        placeholder="Selecione o local"
        :class="{
          'p-invalid': submitted && v$.sector.local.$invalid,
        }"
      />
      <small class="p-error" v-if="submitted && v$.sector.local.$invalid"
        >Local é obrigatório.</small
      >
    </div>
    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.sector.$invalid)"
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
import Sector from "../../../models/sector";

//Services
import SectorService from "../../../service/sector/sector_service";
import LocalService from "../../../service/local/local";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["sectorSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      sector: new Sector(),
      submitted: false,
      sectorService: new SectorService(),
      locals: [],
      localService: new LocalService(),
    };
  },
  created() {},
  mounted() {
    this.findLocals();
  },
  validations() {
    return {
      sector: new Sector().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.sector.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.sector.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.sector.id) {
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
      this.sectorService
        .create(this.sector)
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
      this.sectorService
        .update(this.sector)
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
    findLocals() {
      this.localService
        .findAll()
        .then((response) => {
          this.locals = response;
        })
        .catch((error) => this.$msgErro(error));
    },
    hideDialog() {
      this.sector = new Sector();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.sector = this.sectorSelected;
    },
  },
};
</script>
<style scoped></style>

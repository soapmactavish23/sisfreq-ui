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
      <label for="nome">Nome</label>
      <InputText
        id="nome"
        v-model="v$.sector.nome.$model"
        maxlength="100"
        placeholder="Digite o nome do setor"
        :class="{ 'p-invalid': submitted && v$.sector.nome.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.sector.nome.$invalid"
        >Nome do setor é obrigatório.</small
      >
    </div>
    <div class="field">
      <label for="sigla">Sigla</label>
      <InputText
        id="sigla"
        v-model="sector.sigla"
        maxlength="20"
        placeholder="Digite a sigla do setor"
      />
    </div>
    <div class="field">
      <label for="tipoSetor">Tipo do Setor</label>
      <InputText
        id="tipoSetor"
        v-model="sector.tipoSetor"
        maxlength="20"
        placeholder="Digite a tipo do setor"
      />
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
import Setor from "../../../models/setor";

//Services
import SectorService from "../../../service/sector/sector_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["sectorSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      sector: new Setor(),
      submitted: false,
      sectorService: new SectorService(),
    };
  },
  validations() {
    return {
      sector: new Setor().validations(),
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
      //TODO: SEND SECTOR
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
    hideDialog() {
      this.sector = new Setor();
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

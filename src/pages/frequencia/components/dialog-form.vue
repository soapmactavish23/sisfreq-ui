<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '960px' }"
    header="Fomulário de Frequência"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="atuacao">Atuação</label>
      <Dropdown
        id="atuacao"
        v-model="v$.obj.setorOrigem.$model"
        :options="atuacoes"
        optionLabel="nome"
        placeholder="Selecione a atuação"
        :class="{ 'p-invalid': submitted && v$.obj.setorOrigem.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.obj.setorOrigem.$invalid"
        >Atuação é obrigatória.</small
      >
    </div>
    <div class="p-fluid formgrid grid p-2">
      <div class="field col-4 md:col-6">
        <label for="ano">Ano</label>
        <InputText
          id="ano"
          v-model="v$.obj.ano.$model"
          maxlength="100"
          placeholder="Digite o ano"
          :class="{ 'p-invalid': submitted && v$.obj.ano.$invalid }"
        />
        <small class="p-error" v-if="submitted && v$.obj.ano.$invalid"
          >Ano é obrigatório.</small
        >
      </div>
      <div class="field col-4 md:col-6">
        <label for="mes">Mês</label>
        <InputText
          id="mes"
          v-model="v$.obj.mes.$model"
          maxlength="100"
          placeholder="Digite o mês"
          :class="{ 'p-invalid': submitted && v$.obj.mes.$invalid }"
        />
        <small class="p-error" v-if="submitted && v$.obj.mes.$invalid"
          >Mês é obrigatório.</small
        >
      </div>
    </div>
    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.obj.$invalid)"
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
import Frequencia from "../../../models/frequencia";

//Services
import FrequenciaService from "../../../service/frequencia/frequencia_service";
import SectorService from "../../../service/sector/sector_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";
import Frequecia from "../../../models/frequencia";

export default {
  props: ["objSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      obj: new Frequecia(),
      submitted: false,
      frequeciaService: new FrequenciaService(),
      sectorService: new SectorService(),
      atuacoes: null,
    };
  },
  validations() {
    return {
      obj: new Frequecia().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.frequency.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.frequency.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.obj.id) {
          console.log("aqui");
          this.update();
        } else {
          console.log("aqui2");
          this.create();
        }
      } else {
        return;
      }
    },
    //TODO: FAZER CREATE FUNCIONAR, VERIFICAR NO ENDPOINT CRIARFREQUENCIAS
    create() {
      this.submitted = true;
      this.frequeciaService
        .create(this.obj)
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
      this.frequeciaService
        .update(this.obj)
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
      this.obj = new Frequencia();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.obj = this.objSelected;
      this.getAtuacoes();
    },
    //TODO: FAZER GETATUACOES COM FILTRO
    getAtuacoes() {
      this.sectorService
        .findAll()
        .then((data) => (this.atuacoes = data.content));
    },
  },
};
</script>
<style scoped></style>

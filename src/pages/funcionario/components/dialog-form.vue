<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '920px' }"
    header="Fomulário de Funcionário"
    :modal="true"
    @hide="hideDialog"
  >
    <div class="p-2">
      <fieldset-dados-pessoais :obj="obj" :submitted="submitted" />
      <br />
      <fieldset-dados-vinculo :obj="obj" :submitted="submitted" />
      <br />
      <fieldset-dados-financeiros :obj="obj" :submitted="submitted" />
      <br />
      <fieldset-dados-desligamento :obj="obj" :submitted="submitted" />
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
import Funcionario from "../../../models/funcionario";

//Enums
import { TipoAfastamento } from "../../../models/enums/tipo_afastamento";

//Services
import FuncionarioService from "../../../service/funcionario/funcionario_service";
import SectorService from "../../../service/sector/sector_service";

//COMPONENTS
import FieldsetDadosPessoais from "./fieldset-dados-pessoais.vue";
import FieldsetDadosDesligamento from "./fieldset-dados-desligamento.vue";
import FieldsetDadosVinculo from "./fieldset-dados-vinculo.vue";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";
import FieldsetDadosFinanceiros from "./fieldset-dados-financeiros.vue";

export default {
  props: ["objSelected"],
  components: {
    FieldsetDadosPessoais,
    FieldsetDadosDesligamento,
    FieldsetDadosVinculo,
    FieldsetDadosFinanceiros,
  },
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      obj: new Funcionario(),
      submitted: false,
      service: new FuncionarioService(),
      setoresLotacao: [],
      setoresAtuacao: [],
      sectorService: new SectorService(),
      TipoAfastamento,
    };
  },
  validations() {
    return {
      obj: new Funcionario().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.funcionario.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.funcionario.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.obj.id) {
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
      this.service
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
      this.service
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
      this.obj = new Funcionario();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.obj = this.objSelected;
      if (this.obj.id != null) {
        this.getSectorsLotacao({ value: this.obj.lotacao.sigla });
        this.getSetoresAtuacao({ value: this.obj.atuacao.sigla });
      }
      this.obj.dataDesligamento = this.$DateTime.formatarDateInput(
        this.obj.dataDesligamento
      );
      this.obj.dataInicioAfastamento = this.$DateTime.formatarDateInput(
        this.obj.dataInicioAfastamento
      );
      this.obj.dataFimAfastamento = this.$DateTime.formatarDateInput(
        this.obj.dataFimAfastamento
      );
    },
    getSectorsLotacao(event) {
      let params = {};
      if (event.value != null) params = { sigla: event.value };

      this.sectorService.find(params).then((data) => {
        this.setoresLotacao = data.content;
      });
    },
    getSetoresAtuacao(event) {
      let params = {};
      if (event.value != null) params = { sigla: event.value };

      this.sectorService.find(params).then((data) => {
        this.setoresAtuacao = data.content;
      });
    },
  },
};
</script>
<style scoped></style>

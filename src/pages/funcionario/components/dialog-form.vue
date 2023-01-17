<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '920px' }"
    header="Fomulário de Funcionário"
    :modal="true"
    @hide="hideDialog"
  >
    <div class="p-2">
      <Fieldset legend="Dados pessoais">
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <label for="nome">Nome</label>
            <InputText
              id="nome"
              v-model="v$.obj.nome.$model"
              maxlength="100"
              placeholder="Digite o nome "
              :class="{ 'p-invalid': submitted && v$.obj.nome.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.nome.$invalid"
              >Nome é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="matricula">Matricula</label>
            <InputText
              id="matricula"
              v-model="v$.obj.matricula.$model"
              maxlength="100"
              placeholder="Digite o matricula "
              :class="{ 'p-invalid': submitted && v$.obj.matricula.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.matricula.$invalid"
              >Matricula é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="cpf">CPF</label>
            <InputMask
              mask="999.999.999-99"
              id="cpf"
              v-model="v$.obj.cpf.$model"
              placeholder="Digite o CPF "
              :class="{ 'p-invalid': submitted && v$.obj.cpf.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.cpf.$invalid"
              >CPF é obrigatório.</small
            >
          </div>
        </div>
      </Fieldset>
      <br />
      <Fieldset legend="Dados do Vinculo">
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <label for="vinculo">Vinculo</label>
            <InputText
              id="vinculo"
              v-model="v$.obj.vinculo.$model"
              maxlength="10"
              type="number"
              placeholder="Digite o vinculo "
              :class="{ 'p-invalid': submitted && v$.obj.vinculo.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.vinculo.$invalid"
              >Vinculo é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="atuacao">Atuação</label>
            <Dropdown
              id="atuacao"
              v-model="v$.obj.atuacao.id.$model"
              placeholder="Selecione um setor"
              :options="setores"
              optionLabel="sigla"
              :class="{ 'p-invalid': submitted && v$.obj.atuacao.id.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.atuacao.id.$invalid"
              >Atuação é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="vinculo">Vinculo</label>
            <InputText
              id="vinculo"
              v-model="v$.obj.vinculo.$model"
              maxlength="10"
              type="number"
              placeholder="Digite o vinculo "
              :class="{ 'p-invalid': submitted && v$.obj.vinculo.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.vinculo.$invalid"
              >Vinculo é obrigatório.</small
            >
          </div>
        </div>
      </Fieldset>
      <!-- TODO: DADOS FINANCEIROS -->
      <!-- TODO: DADOS DE DESLIGAMENTO -->
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

//Services
import FuncionarioService from "../../../service/funcionario/funcionario_service";
import SectorService from "../../../service/sector/sector_service"

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["objSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      obj: new Funcionario(),
      submitted: false,
      service: new FuncionarioService(),
      setores: [],
      sectorService: new SectorService(),

    };
  },
  mounted() {
    this.getSectors();
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
    },
    getSectors() {
      this.sectorService.findAll().then((data) => {
        this.setores = data;
      });
    }
  },
};
</script>
<style scoped></style>

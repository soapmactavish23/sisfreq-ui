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
          <div class="field col-12 md:col-6">
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
          <div class="field col-12 md:col-6">
            <label for="horarioTrabalho">Horário de Trabalho</label>
            <InputText
              id="horarioTrabalho"
              v-model="v$.obj.horarioTrabalho.$model"
              maxlength="25"
              placeholder="Digite o horário de trabalho"
              :class="{
                'p-invalid': submitted && v$.obj.horarioTrabalho.$invalid,
              }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.obj.horarioTrabalho.$invalid"
              >Horário de Trabalho é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-6">
            <label for="atuacao">Atuação</label>
            <Dropdown
              id="atuacao"
              v-model="v$.obj.atuacao.id.$model"
              placeholder="Selecione um setor"
              :options="setores"
              optionValue="id"
              optionLabel="sigla"
              style="z-index: 1000 !important"
              :class="{ 'p-invalid': submitted && v$.obj.atuacao.id.$invalid }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.obj.atuacao.id.$invalid"
              >Atuação é obrigatório.</small
            >
          </div>

          <div class="field col-12 md:col-6">
            <label for="lotacao">Lotação</label>
            <Dropdown
              id="lotacao"
              v-model="v$.obj.lotacao.id.$model"
              placeholder="Selecione um setor"
              :options="setores"
              optionValue="id"
              optionLabel="sigla"
              :class="{ 'p-invalid': submitted && v$.obj.lotacao.id.$invalid }"
            />
            <small
              class="p-error"
              v-if="submitted && v$.obj.lotacao.id.$invalid"
              >Lotação é obrigatório.</small
            >
          </div>
        </div>
      </Fieldset>
      <br />
      <Fieldset legend="Dados Financeiros">
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-4">
            <label for="banco">Banco</label>
            <InputText
              id="banco"
              v-model="v$.obj.banco.$model"
              maxlength="20"
              placeholder="Digite o banco "
              :class="{ 'p-invalid': submitted && v$.obj.banco.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.banco.$invalid"
              >Banco é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="agencia">Agência</label>
            <InputText
              id="agencia"
              v-model="v$.obj.agencia.$model"
              maxlength="10"
              placeholder="Digite o agência "
              :class="{ 'p-invalid': submitted && v$.obj.agencia.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.agencia.$invalid"
              >Agência é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-4">
            <label for="conta">Conta</label>
            <InputText
              id="conta"
              v-model="v$.obj.conta.$model"
              maxlength="10"
              placeholder="Digite o conta "
              :class="{ 'p-invalid': submitted && v$.obj.conta.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.conta.$invalid"
              >Conta é obrigatório.</small
            >
          </div>
        </div>
      </Fieldset>
      <br />
      <Fieldset legend="Dados de Desligamento">
        <div class="p-fluid formgrid grid">
          <div class="field col-12 md:col-6">
            <label for="agencia">Data de Desligamento</label>
            <InputText
              id="agencia"
              v-model="v$.obj.dataDesligamento.$model"
              type="date"
              :class="{ 'p-invalid': submitted && v$.obj.dataDesligamento.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.dataDesligamento.$invalid"
              >Agência é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-6">
            <label for="tipoAfastamento">Tipo de Afastamento</label>
            <InputText
              id="tipoAfastamento"
              v-model="v$.obj.tipoAfastamento.$model"
              maxlength="20"
              placeholder="Digite o tipo afastamento"
              :class="{ 'p-invalid': submitted && v$.obj.tipoAfastamento.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.tipoAfastamento.$invalid"
              >Tipo de Afastamento é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-6">
            <label for="dataInicioAfastamento">Data de Inicio do Afastamento</label>
            <InputText
              id="dataInicioAfastamento"
              v-model="v$.obj.dataInicioAfastamento.$model"
              type="date"
              placeholder="Digite o dataInicioAfastamento "
              :class="{ 'p-invalid': submitted && v$.obj.dataInicioAfastamento.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.dataInicioAfastamento.$invalid"
              >Data de Inicio do Afastamento é obrigatório.</small
            >
          </div>
          <div class="field col-12 md:col-6">
            <label for="dataFimAfastamento">Data de Fim do Afastamento</label>
            <InputText
              id="dataFimAfastamento"
              v-model="v$.obj.dataFimAfastamento.$model"
              type="date"
              placeholder="Digite o dataFimAfastamento "
              :class="{ 'p-invalid': submitted && v$.obj.dataFimAfastamento.$invalid }"
            />
            <small class="p-error" v-if="submitted && v$.obj.dataFimAfastamento.$invalid"
              >Data de Fim do Afastamento é obrigatório.</small
            >
          </div>
        </div>
      </Fieldset>
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
import SectorService from "../../../service/sector/sector_service";

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
      this.obj.dataDesligamento = this.$DateTime.formatarDateInput(this.obj.dataDesligamento);
      this.obj.dataInicioAfastamento = this.$DateTime.formatarDateInput(this.obj.dataInicioAfastamento);
      this.obj.dataFimAfastamento = this.$DateTime.formatarDateInput(this.obj.dataFimAfastamento);
    },
    getSectors() {
      this.sectorService.findAll().then((data) => {
        this.setores = data;
      });
    },
  },
};
</script>
<style scoped></style>

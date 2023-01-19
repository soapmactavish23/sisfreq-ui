<template>
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
        <label for="situacao">Situação</label>
        <Dropdown
          id="situacao"
          v-model="v$.obj.situacao.$model"
          :options="SituacaoFuncionario"
          optionLabel="name"
          optionValue="key"
          placeholder="Selecione uma situação"
          :class="{ 'p-invalid': submitted && v$.obj.situacao.$invalid }"
        />
        <small class="p-error" v-if="submitted && v$.obj.situacao.$invalid"
          >Situação é obrigatório.</small
        >
      </div>
      <div class="field col-12 md:col-4">
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
          filterPlaceholder="Pesquisar por sigla"
          :options="setoresAtuacao"
          optionValue="id"
          optionLabel="sigla"
          :virtualScrollerOptions="{
            lazy: true,
            onLazyLoad: onLazyLoad,
            itemSize: 10,
            showLoader: true,
            loading: loading,
            delay: 250,
          }"
          @filter="getSetoresAtuacao($event)"
          :filter="true"
          :class="{ 'p-invalid': submitted && v$.obj.atuacao.id.$invalid }"
        />
        <small class="p-error" v-if="submitted && v$.obj.atuacao.id.$invalid"
          >Atuação é obrigatório.</small
        >
      </div>

      <div class="field col-12 md:col-6">
        <label for="lotacao">Lotação</label>
        <Dropdown
          id="lotacao"
          v-model="v$.obj.lotacao.id.$model"
          placeholder="Selecione um setor"
          filterPlaceholder="Pesquisar por sigla"
          :options="setoresLotacao"
          optionValue="id"
          optionLabel="sigla"
          :virtualScrollerOptions="{
            lazy: true,
            onLazyLoad: onLazyLoad,
            itemSize: 10,
            showLoader: true,
            loading: loading,
            delay: 250,
          }"
          @filter="getSectorsLotacao($event)"
          :filter="true"
          :class="{ 'p-invalid': submitted && v$.obj.lotacao.id.$invalid }"
        />
        <small class="p-error" v-if="submitted && v$.obj.lotacao.id.$invalid"
          >Lotação é obrigatório.</small
        >
      </div>
    </div>
  </Fieldset>
</template>

<script>
//Models
import Funcionario from "../../../models/funcionario";

//Services
import SectorService from "../../../service/sector/sector_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["obj", "submitted"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      setoresLotacao: [],
      setoresAtuacao: [],
      sectorService: new SectorService(),
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
  validations() {
    return {
      obj: new Funcionario().validations(),
    };
  },
  //TODO: comunicar com o pai pra buscar dados de acordo com filtro getSectorsLotacao e getSectorsAtuacao
};
</script>

<style>
</style>
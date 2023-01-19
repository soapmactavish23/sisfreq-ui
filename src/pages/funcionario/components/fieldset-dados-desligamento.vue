<template>
  <Fieldset legend="Dados de Desligamento">
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="agencia">Data de Desligamento</label>
        <InputText
          id="agencia"
          v-model="v$.obj.dataDesligamento.$model"
          type="date"
          :class="{
            'p-invalid': submitted && v$.obj.dataDesligamento.$invalid,
          }"
        />
        <small
          class="p-error"
          v-if="submitted && v$.obj.dataDesligamento.$invalid"
          >Agência é obrigatório.</small
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="tipoAfastamento">Tipo de Afastamento</label>
        <Dropdown
          id="tipoAfastamento"
          v-model="v$.obj.tipoAfastamento.$model"
          :options="TipoAfastamento"
          optionLabel="name"
          optionValue="key"
          placeholder="Selecione o tipo de afastamento"
          :showClear="true"
          :filter="true"
          :class="{
            'p-invalid': submitted && v$.obj.tipoAfastamento.$invalid,
          }"
        />
        <small
          class="p-error"
          v-if="submitted && v$.obj.tipoAfastamento.$invalid"
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
          :class="{
            'p-invalid': submitted && v$.obj.dataInicioAfastamento.$invalid,
          }"
        />
        <small
          class="p-error"
          v-if="submitted && v$.obj.dataInicioAfastamento.$invalid"
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
          :class="{
            'p-invalid': submitted && v$.obj.dataFimAfastamento.$invalid,
          }"
        />
        <small
          class="p-error"
          v-if="submitted && v$.obj.dataFimAfastamento.$invalid"
          >Data de Fim do Afastamento é obrigatório.</small
        >
      </div>
    </div>
  </Fieldset>
</template>

<script>
//Models
import Funcionario from "../../../models/funcionario";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["obj", "submitted"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {},
  validations() {
    return {
      obj: new Funcionario().validations(),
    };
  },
};
</script>

<style>
</style>
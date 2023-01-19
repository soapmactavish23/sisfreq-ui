<template>
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
          maxlength="15"
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
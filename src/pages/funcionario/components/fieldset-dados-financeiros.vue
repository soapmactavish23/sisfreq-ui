<template>
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
<template>
  <Fieldset legend="Endereço">
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-4">
        <label for="cep"
          >CEP: <b>{{ person.address.cep }}</b></label
        >
      </div>
      <div class="field col-12 md:col-4">
        <label for="district"
          >Bairro: <b>{{ person.address.district }}</b></label
        >
      </div>
      <div class="field col-12 md:col-4">
        <label for="city"
          >Cidade: <b>{{ person.address.city }}</b></label
        >
      </div>
      <div class="field col-12 md:col-4">
        <label for="street"
          >Rua: <b>{{ person.address.street }}</b></label
        >
      </div>
      <div class="field col-12 md:col-4">
        <label for="complement"
          >Complemento: <b>{{ person.address.complement }}</b></label
        >
      </div>
      <div class="field col-12 md:col-2">
        <label for="complement"
          >Número: <b>{{ person.address.number }}</b></label
        >
      </div>
      <div class="field col-12 md:col-2">
        <label for="state"
          >Estado: <b>{{ person.address.state }}</b></label
        >
      </div>
    </div>
  </Fieldset>
</template>

<script>
export default {
  props: ["person"],
};
</script>

<style></style>

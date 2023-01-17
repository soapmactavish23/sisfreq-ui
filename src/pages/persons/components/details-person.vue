<template>
  <Fieldset legend="Dados pessoais">
    <div class="p-fluid formgrid grid">
      <div class="field col-12 md:col-6">
        <label for="name"
          >Nome: <b>{{ person.name }}</b></label
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="cpf"
          >CPF: <b>{{ person.cpf }}</b></label
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="dtBirdate"
          >Data de nascimento:
          <b>{{ $DateTime.formatarDate(person.dtBirdate) }}</b></label
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="contact"
          >Contato: <b>{{ person.contact }}</b></label
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="credential"
          >Matrícula: <b>{{ person.credential }}</b></label
        >
      </div>
      <div class="field col-12 md:col-6">
        <label for="gender"
          >Gênero: <b>{{ person.gender.name }}</b></label
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

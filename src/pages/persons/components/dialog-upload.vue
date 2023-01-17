<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '400px' }"
    header="Enviar uma foto"
    :modal="true"
    @hide="hideDialog"
  >
    <div v-if="person.image != null" align="center">
      <img
        :src="person.image"
        width="200"
        height="300"
        class="img-fluid img-thumbnail"
      />
    </div>

    <br />

    <FileUpload
      name="demo[]"
      accept="image/*"
      :maxFileSize="1000000"
      @select="onSelect"
      :showUploadButton="false"
      chooseLabel="Escolha"
      cancelLabel="Cancelar"
    >
      <template #content>
        <ul v-if="uploadedFiles && uploadedFiles[0]">
          <li v-for="file of uploadedFiles[0]" :key="file">
            {{ file.name }} - {{ file.size }} bytes
          </li>
        </ul>
      </template>
      <template #empty>
        <p>Nenhum arquivo selecionado</p>
      </template>
    </FileUpload>

    <ProgressBar mode="indeterminate" v-if="initProgress" />

    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send"
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
import Person from "../../../models/person";

//Services
import PersonService from "../../../service/persons/person_service";

export default {
  props: ["personSelected"],
  data() {
    return {
      person: new Person(),
      personService: new PersonService(),
      firebase: null,
      initProgress: false,
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.persons.dialogUpload;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.persons.dialogUpload = value;
      },
    },
  },
  methods: {
    onSelect(obj) {
      this.firebase
        .onSelect(obj)
        .then((file) => {
          this.fileSelected = file;
        })
        .catch((err) => {
          this.$toast.add({
            severity: "error",
            summary: "Erro!",
            detail: err,
            life: 3000,
          });
        });
    },
    send() {
      this.initProgress = true;
      this.firebase
        .onUpload(this.fileSelected, `person/${this.person.id}`)
        .then((url) => {
          this.person.image = url;
          this.update();
        })
        .catch((err) => {
          console.error(err);
          this.initProgress = false;
          this.$toast.add({
            severity: "error",
            summary: "Alerta de Erro.",
            detail: "Não foi possível enviar a imagem, tente novamente!",
            life: 6000,
          });
        });
    },
    update() {
      this.personService
        .update(this.person)
        .then((data) => {
          if (data.status === 200) {
            this.initProgress = false;
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
          this.initProgress = false;
        });
    },
    hideDialog() {
      this.person = new Person();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
      this.initProgress = false;
    },
    getData() {
      this.person = this.personSelected;
      this.firebase = this.$Firebase;
    },
  },
};
</script>
<style scoped></style>

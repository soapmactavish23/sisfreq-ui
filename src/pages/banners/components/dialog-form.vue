<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '500px' }"
    header="Banner"
    :modal="true"
    @hide="hideDialog"
  >
    <div v-if="banner.image" class="text-center">
      <img
        :src="banner.image"
        width="200"
        height="200"
        class="img-fluid img-thumbnail"
      />
      <br /><br />
    </div>
    <FileUpload
      name="demo[]"
      accept="image/*"
      :maxFileSize="2000000"
      @select="onSelect"
      :showUploadButton="false"
      chooseLabel="Escolha uma imagem"
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
        @click="onUpload"
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
import BannerView from "../../../models/banner_view";

//Services
import BannerService from "../../../service/banner/banner_service";

export default {
  props: ["bannerSelected"],
  data() {
    return {
      banner: new BannerView(),
      submitted: false,
      bannerService: new BannerService(),
      fileSelected: {},
      initProgress: false,
    };
  },
  created() {},
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.banner.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.banner.dialogForm = value;
      },
    },
  },
  methods: {
    onSelect(obj) {
      this.$Firebase
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
      if (!this.banner.id) {
        this.create();
      } else {
        this.update();
      }
    },
    onUpload() {
      this.initProgress = true;
      this.$Firebase
        .onUpload(
          this.fileSelected,
          `banner/${this.$DateTime.formateToString(new Date())}`
        )
        .then((url) => {
          this.banner.image = url;
          this.send();
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
    create() {
      this.submitted = true;
      this.bannerService
        .create(this.banner)
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
      this.bannerService
        .update(this.banner)
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
          this.initProgress = false;
        });
    },
    hideDialog() {
      this.banner = new BannerView();
      this.submitted = false;
      this.initProgress = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.banner = this.bannerSelected;
    },
  },
};
</script>
<style scoped></style>

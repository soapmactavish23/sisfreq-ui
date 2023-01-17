<template>
  <form @submit.prevent="send(!v$.service.$invalid)">
    <Dialog
      v-model:visible="visibleDialog"
      :style="{ width: '920px' }"
      header="Fomulário de Serviços"
      :modal="true"
      @hide="hideDialog"
    >
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-6">
          <label for="name">Nome</label>
          <InputText
            id="name"
            v-model="v$.service.name.$model"
            maxlength="100"
            placeholder="Digite a nome do serviço"
            :class="{ 'p-invalid': submitted && v$.service.name.$invalid }"
          />
          <small
            v-if="submitted && v$.service.name.minLength.$invalid"
            class="p-error"
            >Nome inválido. Mínimo 3 caracteres</small
          >
          <small
            v-else-if="submitted && v$.service.name.$invalid"
            class="p-error"
            >Nome é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="generalAccess">URL de acesso</label>
          <InputText
            id="generalAccess"
            v-model="v$.service.generalAccess.$model"
            maxlength="100"
            placeholder="Digite a URL de acesso"
            :class="{
              'p-invalid': submitted && v$.service.generalAccess.$invalid,
            }"
          />
          <small
            v-if="submitted && v$.service.generalAccess.$invalid"
            class="p-error"
            >URL de acesso é obrigatório</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="internalAccess">Acesso interno</label>
          <InputText
            id="internalAccess"
            v-model="v$.service.internalAccess.$model"
            maxlength="100"
            placeholder="Digite o IP de acesso interno"
            :class="{
              'p-invalid': submitted && v$.service.internalAccess.$invalid,
            }"
          />
          <small
            v-if="submitted && v$.service.internalAccess.$invalid"
            class="p-error"
            >IP de acesso interno é obrigatório</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="externalAccess">Acesso externo</label>
          <InputText
            id="externalAccess"
            v-model="v$.service.externalAccess.$model"
            maxlength="100"
            placeholder="Digite o IP de acesso externo"
            :class="{
              'p-invalid': submitted && v$.service.externalAccess.$invalid,
            }"
          />
          <small
            v-if="submitted && v$.service.externalAccess.$invalid"
            class="p-error"
            >IP de acesso externo é obrigatório</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="ipServer">Servidor de Aplicação</label>
          <InputMask
            id="ipServer"
            v-model="v$.service.ipServer.$model"
            mask="999.999.999.999"
            placeholder="Digite o IP do Servidor Host"
            :class="{
              'p-invalid': submitted && v$.service.ipServer.$invalid,
            }"
          />
          <small
            v-if="submitted && v$.service.ipServer.$invalid"
            class="p-error"
            >IP de servidor de aplicação é obrigatório</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="ipDatabase">Servidor do Banco</label>
          <InputMask
            id="ipDatabase"
            v-model="v$.service.ipDatabase.$model"
            mask="999.999.999.999"
            placeholder="Digite o IP do servidor do banco de dados"
            :class="{
              'p-invalid': submitted && v$.service.ipDatabase.$invalid,
            }"
          />
          <small
            v-if="submitted && v$.service.ipDatabase.$invalid"
            class="p-error"
            >IP de servidor do banco é obrigatório</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="category">Categoria</label>
          <Dropdown
            id="category"
            v-model="v$.service.category.$model"
            optionLabel="description"
            :options="categories"
            placeholder="Selecione a categoria"
            :class="{
              'p-invalid':
                submitted && v$.service.category.description.$invalid,
            }"
          />
          <small
            class="p-error"
            v-if="submitted && v$.service.category.description.$invalid"
            >Categoria é obrigatório.</small
          >
        </div>
        <div class="field col-12 md:col-6">
          <label for="description">Descrição</label>
          <Textarea
            id="description"
            v-model="v$.service.description.$model"
            placeholder="Digite a descrição do serviço. Release ou texto informativo (MIN: 10 CARACTERES)"
            :autoResize="true"
            :class="{
              'p-invalid': submitted && v$.service.description.$invalid,
            }"
          />
          <span
            v-if="submitted && v$.service.description.minLength.$invalid"
            class="p-error"
            >Descrição inválida. Mínimo 10 caracteres</span
          >
          <small
            v-else-if="submitted && v$.service.description.$invalid"
            class="p-error"
            >Descrição é obrigatório.</small
          >
        </div>
        <Fieldset legend="Imagem" class="field col-12">
          <div v-if="service.image">
            <img
              :src="service.image"
              width="200"
              height="200"
              class="img-fluid img-thumbnail"
            />
            <br /><br />
          </div>
          <FileUpload
            name="demo[]"
            accept="image/*"
            :maxFileSize="1000000"
            @select="onSelect"
            @clear="clearFile"
            @remove="clearFile"
            :showUploadButton="false"
            :fileLimit="1"
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
        </Fieldset>
      </div>
      <template #footer>
        <Button
          label="Salvar"
          class="p-button"
          icon="pi pi-check"
          @click="send(!v$.service.$invalid)"
        />
        <Button
          label="Cancelar"
          icon="pi pi-times"
          class="p-button p-button-text"
          @click="hideDialog"
        />
      </template>
    </Dialog>
  </form>
</template>
<script>
//Models
import Service from "../../../models/service";

//Services
import ServiceService from "../../../service/service/service";
import CategoryService from "../../../service/category/category_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["serviceSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      service: new Service(),
      submitted: false,
      serviceService: new ServiceService(),
      categoryService: new CategoryService(),
      categories: [],
      fileSelected: null,
      initProgress: false,
    };
  },
  mounted() {
    this.findCategories();
    this.clearFile();
  },
  validations() {
    return {
      service: new Service().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.service.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.service.dialogForm = value;
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
    clearFile() {
      this.fileSelected = null;
    },
    send(isFormValid) {
      this.submitted = true;
      if (!isFormValid) {
        return;
      } else {
        //console.log("form valido");
        this.saveService();
      }
    },
    saveService() {
      if (this.service.id) {
        //se estiver em editar service
        if (this.fileSelected) {
          //se já tiver imagem cadastrada deleta a antiga e faz upload da nova
          if (this.service.image != null) {
            //se já tem imagem cadastrada anteriormente: deleta ela antes de fazer o upload
            this.deleteImage();
          }
          this.onUpload();
        } else {
          //senao tiver imagem cadastrada apenas atualiza
          this.update();
        }
      } else {
        //se estiver em criar novo service
        if (!this.fileSelected) {
          //senao tiver imagem a ser cadastrada apenas cria novo service
          this.create();
        } else {
          //se tiver imagem a ser cadastrada faz upload e cria novo service
          this.onUpload();
        }
      }
    },
    onUpload() {
      this.initProgress = true;
      this.$Firebase
        .onUpload(
          this.fileSelected,
          `service/${this.$DateTime.formateToString(new Date())}`
        )
        .then((url) => {
          this.service.image = url;
          if (this.service.id) {
            this.update();
          } else {
            this.create();
          }
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
      this.serviceService
        .create(this.service)
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
      this.serviceService
        .update(this.service)
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
    deleteImage() {
      this.loading = true;
      this.$Firebase
        .onDeleteByURL(this.service.image)
        .then(() => {})
        .catch((err) => {
          this.loading = false;
          this.$toast.add({
            severity: "error",
            summary: "Alerta de Erro.",
            detail: err,
            life: 6000,
          });
        });
    },
    hideDialog() {
      this.service = new Service();
      this.submitted = false;
      this.clearFile();
      this.$emit("findAll");
      this.visibleDialog = false;
      this.initProgress = false;
    },
    getData() {
      this.service = this.serviceSelected;
    },
    findCategories() {
      this.categoryService.findAll().then((data) => (this.categories = data));
    },
  },
};
</script>
<style scoped></style>

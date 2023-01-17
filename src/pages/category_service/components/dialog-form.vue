<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '480px' }"
    header="Fomulário de Categoria de Serviços"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="description">Descrição</label>
      <InputText
        id="description"
        v-model="v$.category.description.$model"
        maxlength="100"
        placeholder="Digite a descrição"
        :class="{ 'p-invalid': submitted && v$.category.description.$invalid }"
      />
      <small
        class="p-error"
        v-if="submitted && v$.category.description.$invalid"
        >Descrição é obrigatório.</small
      >
    </div>

    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.category.$invalid)"
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
import Category from "../../../models/category";

//Services
import CategoryService from "../../../service/category/category_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["categorySelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      category: new Category(),
      submitted: false,
      categoryService: new CategoryService(),
    };
  },
  created() {},
  validations() {
    return {
      category: new Category().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.category.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.category.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.category.id) {
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
      this.categoryService
        .create(this.category)
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
      this.categoryService
        .update(this.category)
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
      this.category = new Category();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.category = this.categorySelected;
    },
  },
};
</script>
<style scoped></style>

<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '480px' }"
    header="Fomulário de Local"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="name">Nome</label>
      <InputText
        id="name"
        v-model="v$.local.name.$model"
        maxlength="100"
        placeholder="Digite o nome do local"
        :class="{ 'p-invalid': submitted && v$.local.name.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.local.name.$invalid"
        >Nome do local é obrigatório.</small
      >
    </div>
    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.local.$invalid)"
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
import Local from "../../../models/local";

//Services
import LocalService from "../../../service/local/local";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["localSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      local: new Local(),
      submitted: false,
      localService: new LocalService(),
    };
  },
  created() {},
  validations() {
    return {
      local: new Local().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.local.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.local.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.local.id) {
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
      this.localService
        .create(this.local)
        .then((data) => {
          if (data.status === 201) {
            this.$msgSuccess(data);
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    update() {
      this.submitted = true;
      this.localService
        .update(this.local)
        .then((data) => {
          if (data.status === 200) {
            this.$msgSuccess(data);
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    hideDialog() {
      this.local = new Local();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.local = this.localSelected;
    },
  },
};
</script>
<style scoped></style>

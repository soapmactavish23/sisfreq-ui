<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '480px' }"
    header="Fomulário de Permissões"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="description">Descrição</label>
      <InputText
        id="description"
        v-model="v$.permission.description.$model"
        maxlength="100"
        placeholder="Digite a descrição"
        :class="{
          'p-invalid': submitted && v$.permission.description.$invalid,
        }"
      />
      <small
        class="p-error"
        v-if="submitted && v$.permission.description.$invalid"
        >Descrição é obrigatório.</small
      >
    </div>

    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.permission.$invalid)"
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
import Permission from "../../../models/permission";

//Services
import PermissionService from "../../../service/permission/permission";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["permissionSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      permission: new Permission(),
      submitted: false,
      permissionService: new PermissionService(),
    };
  },
  created() {},
  validations() {
    return {
      permission: new Permission().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.permission.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.permission.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.permission.id) {
          this.update();
        } else {
          this.create();
        }
      } else {
        return;
      }
    },
    create() {
      this.permissionService
        .create(this.permission)
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
      this.permissionService
        .update(this.permission)
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
      this.permission = new Permission();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.permission = this.permissionSelected;
    },
  },
};
</script>
<style scoped></style>

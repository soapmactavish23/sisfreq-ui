<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: '800px' }"
    header="Fomulário de Grupos"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="field">
      <label for="descricao">Descrição</label>
      <InputText
        id="descricao"
        v-model="v$.groups.descricao.$model"
        maxlength="100"
        placeholder="Digite a descrição"
        :class="{ 'p-invalid': submitted && v$.groups.descricao.$invalid }"
      />
      <small class="p-error" v-if="submitted && v$.groups.descricao.$invalid"
        >Descrição é obrigatório.</small
      >
    </div>

    <label for="nome">Permissões do Grupo</label>
    <div class="p-fluid p-formgrid p-grid">
      <div class="p-col-12" style="padding: 5px">
        <Listbox
          v-model="v$.groups.permissoes.$model"
          :options="permissoes"
          :multiple="true"
          :filter="true"
          optionLabel="descricao"
          listStyle="max-height:350px"
          filterPlaceholder="DIGITE O NOME DA PERMISSÃO."
          emptyFilterMessage="Nenhum Resultado..."
          emptyMessage="Nenhum Resultado..."
          :class="{
            'p-invalid': submitted && v$.groups.permissoes.$invalid,
          }"
        >
          <template #header>
            <div style="padding: 15px">
              <Checkbox
                id="binary"
                v-model="selectedAllPermissoes"
                :binary="true"
                @click="allPermissoes()"
                class="p-mr-1"
              />
              <small>Todas as Permissões</small>
            </div>
          </template>
          <template #option="slotProps">
            <div class="product-list-detail">
              <i class="pi pi-unlock product-category-icon p-mr-3"> </i>
              <span class="product-category">
                {{ slotProps.option.descricao.replace("ROLE_", "") }}.</span
              >
            </div>
          </template>
        </Listbox>
        <small class="p-error" v-if="submitted && v$.groups.permissoes.$invalid"
          >Permissão é obrigatório.</small
        >
      </div>
    </div>

    <template #footer>
      <Button
        label="Salvar"
        class="p-button"
        icon="pi pi-check"
        @click="send(!v$.groups.$invalid)"
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
import Grupo from "../../../models/grupo";

//Services
import GroupsService from "../../../service/group/group_service";
import PermissionService from "../../../service/permission/permission_service";

//VALIDATIONS
import { useVuelidate } from "@vuelidate/core";

export default {
  props: ["groupsSelected"],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      groups: new Grupo(),
      submitted: false,
      groupsService: new GroupsService(),
      permissoes: [],
      selectedAllPermissoes: false,
      permissionService: new PermissionService(),
    };
  },
  created() {},
  mounted() {
    this.findAllPermissions();
  },
  validations() {
    return {
      groups: new Grupo().validations(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        let value = this.$store.state.views.groups.dialogForm;
        if (value === true) this.getData();
        return value;
      },
      set(value) {
        this.$store.state.views.groups.dialogForm = value;
      },
    },
  },
  methods: {
    send(isFormValid) {
      this.submitted = true;
      if (isFormValid) {
        if (this.groups.id) {
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
      this.groupsService
        .create(this.groups)
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
      this.groupsService
        .update(this.groups)
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
    allPermissoes() {
      if (this.selectedAllPermissoes === false) {
        this.groups.permissoes = this.permissoes;
      } else {
        this.groups.permissoes = null;
      }
    },
    findAllPermissions() {
      this.permissionService
        .findAll()
        .then((data) => {
          this.permissoes = data;
        })
        .catch((error) => {
          if (error.response.status === 401) {
            this.$msgWarn(null);
          }
        });
    },
    hideDialog() {
      this.groups = new Grupo();
      this.submitted = false;
      this.$emit("findAll");
      this.visibleDialog = false;
    },
    getData() {
      this.groups = this.groupsSelected;
    },
  },
};
</script>
<style scoped></style>

<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Gerenciamento de Gêneros" style="height: 100%">
        <Toolbar class="p-mb-4">
          <template #start>
            <Button
              label="Novo"
              icon="pi pi-plus"
              class="mr-2"
              @click="showCreate()"
            />
          </template>
          <template #end>
            <div
              class="
                table-header
                p-d-flex p-flex-column p-flex-md-row p-jc-md-between
              "
            >
              <span class="p-input-icon-left">
                <i class="pi pi-search" />
                <InputText
                  v-model="filters['global'].value"
                  placeholder="Buscar..."
                />
              </span>
            </div>
          </template>
        </Toolbar>
        <DataTable
          ref="dt"
          dataKey="id"
          class="p-datatable-sm"
          :value="genders"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          :filters="filters"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :loading="loading"
        >
          <template #empty>
            <div class="p-text-center">Nenhum resultado encontrado...</div>
          </template>
          <Column header="Nome" field="name" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.name }}
            </template>
          </Column>
          <Column header="Descrição" field="description" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.description }}
            </template>
          </Column>
          <Column header="Ações">
            <template #body="slotProps">
              <Button
                icon="pi pi-pencil"
                class="p-button-rounded p-button-success mr-2"
                @click="showUpdate(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA EDITAR'"
              />
              <Button
                icon="pi pi-trash"
                class="p-button-rounded p-button-warning"
                @click="showRemove(slotProps.data)"
                v-tooltip.top="'CLIQUE PARA EXCLUIR'"
              />
            </template>
          </Column>
        </DataTable>
      </Panel>
    </div>
    <ConfirmDialog></ConfirmDialog>
  </div>

  <!--MODAL CADASTRAR-->
  <dialog-form :genderSelected="gender" @findAll="findAll" />
  <!--FIM MODAL CADASTRAR-->
</template>

<script>
import { FilterMatchMode } from "primevue/api";

//models
import Gender from "../../models/gender";

//Services
import GenderService from "../../service/gender/gender";

//components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      loading: false,
      genders: [],
      gender: new Gender(),
      permissoes: [],
      filters: {},
      filtersPermissions: {},
      genderService: new GenderService(),
    };
  },
  created() {
    this.initFilters();
  },
  mounted() {
    this.findAll();
  },
  methods: {
    showCreate() {
      this.gender = new Gender();
      this.$store.state.views.gender.dialogForm = true;
    },
    showUpdate(gender) {
      this.gender = gender;
      this.$store.state.views.gender.dialogForm = true;
    },
    showRemove(gender) {
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.genderService
            .delete(gender.id)
            .then((data) => {
              this.$msgSuccess(data);
              this.findAll();
            })
            .catch((error) => {
              this.$msgErro(error);
            });
        },
      });
    },
    findAll() {
      this.loading = true;
      this.genderService.findAll().then((data) => {
        this.genders = data;
        this.loading = false;
      });
    },
    initFilters() {
      this.filters = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
      this.filtersPermissions = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../App.scss");
</style>

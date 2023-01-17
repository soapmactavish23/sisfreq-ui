<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Panel
        header="Gerenciamento de Categoria de Serviços"
        style="height: 100%"
      >
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
          :value="categories"
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
  <dialog-form :categorySelected="category" @findAll="findAll" />
  <!--FIM MODAL CADASTRAR-->
</template>

<script>
import { FilterMatchMode } from "primevue/api";

//models
import Category from "../../models/category";

//Services
import CategoryService from "../../service/category/category_service";

//components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      loading: false,
      categories: [],
      category: new Category(),
      permissoes: [],
      filters: {},
      filtersPermissions: {},
      categoryService: new CategoryService(),
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
      this.category = new Category();
      this.$store.state.views.category.dialogForm = true;
    },
    showUpdate(category) {
      this.category = category;
      this.$store.state.views.category.dialogForm = true;
    },
    showRemove(category) {
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.categoryService
            .delete(category.id)
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
      this.categoryService.findAll().then((data) => {
        this.categories = data;
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

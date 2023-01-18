<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Gerenciamento de Funcionários" style="height: 100%">
        <Toolbar class="p-mb-4">
          <template #start>
            <Button
              label="Novo"
              icon="pi pi-plus"
              class="mr-2"
              @click="showCreate()"
            />
          </template>
        </Toolbar>
        <DataTable
          ref="dt"
          dataKey="id"
          class="p-datatable-sm"
          :value="list"
          :lazy="true"
          :paginator="true"
          :rows="10"
          :rowsPerPageOptions="[10, 20, 50]"
          :filters="filters"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          :loading="loading"
          :totalRecords="totalRecords"
          @page="onPage($event)"
          @sort="onSort($event)"
          @filter="onFilter($event)"
          filterDisplay="row"
          responsiveLayout="scroll"
          currentPageReportTemplate="Registro {first} de {last} de {totalRecords}"
          :globalFilterFields="['nome', 'cpf', 'matricula']"
        >
          <template #empty>
            <div class="p-text-center">Nenhum resultado encontrado...</div>
          </template>
          <Column
            field="nome"
            header="Nome"
            filterMatchMode="startsWith"
            filterField="nome"
            ref="nome"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Pesquisar por nome"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.nome }}
            </template>
          </Column>
          <Column
            field="cpf"
            header="CPF"
            filterMatchMode="startsWith"
            filterField="cpf"
            ref="cpf"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Pesquisar por cpf"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.cpf }}
            </template>
          </Column>
          <Column
            field="matricula"
            header="Matricula"
            filterMatchMode="startsWith"
            ref="matricula"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Pesquisar por matricula"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.matricula }}
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
  <dialog-form :objSelected="obj" @findAll="loadLazyData" />
  <!--FIM MODAL CADASTRAR-->
</template>

<script>
// import { FilterMatchMode } from "primevue/api";  

//models
import Funcionario from "../../models/funcionario";

//Services
import FuncionarioService from "../../service/funcionario/funcionario_service";

//components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      loading: false,
      list: [],
      obj: new Funcionario(),
      permissoes: [],
      filters: {
        nome: { value: "", matchMode: "contains" },
        matricula: { value: "", matchMode: "contains" },
        cpf: { value: "", matchMode: "contains" },
      },
      service: new FuncionarioService(),
      lazyParams: {}
    };
  },
  mounted() {
    this.loading = true;

    this.lazyParams = {
      first: 0,
      rows: this.$refs.dt.rows,
      sortField: null,
      sortOrder: null,
      nome: "",
      matricula: "",
      cpf: "",
    };

    this.loadLazyData();
  },
  methods: {
    showCreate() {
      this.obj = new Funcionario();
      this.$store.state.views.funcionario.dialogForm = true;
    },
    showUpdate(obj) {
      this.obj = obj;
      this.$store.state.views.funcionario.dialogForm = true;
    },
    showRemove(obj) {
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.service
            .delete(obj.id) 
            .then((data) => {
              this.$msgSuccess(data);
              this.loadLazyData();
            })
            .catch((error) => {
              this.$msgErro(error);
            });
        },
      });   
    },
    loadLazyData() {
      this.loading = true;
      this.service.find(this.lazyParams).then((data) => {
        this.list = data.content;
        this.totalRecords = data.totalElements;
        this.loading = false;
      });
    },
    onPage(event) {
      this.lazyParams = event;
      this.loadLazyData();
    },
    onSort(event) {
      this.lazyParams = event;
      this.loadLazyData();
    },
    onFilter(event) { 
      this.lazyParams.nome = event.filters.nome.value;
      this.lazyParams.cpf = event.filters.cpf.value;
      this.lazyParams.matricula = event.filters.matricula.value;
      this.loadLazyData();
    },
  },
};
</script>

<style lang="scss" scoped> 
@import url("../../App.scss");
</style>

<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Gerenciamento de Frequência" style="height: 100%">
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
          :globalFilterFields="['funcionario.matricula', 'mes', 'ano']"
        >
          <template #empty>
            <div class="p-text-center">Nenhum resultado encontrado...</div>
          </template>

          <Column
            field="funcionario.matricula"
            header="Funcionário"
            filterMatchMode="startsWith"
            filterField="funcionario.matricula"
            ref="funcionario.matricula"
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
              {{
                slotProps.data.funcionario.nome
              }}
            </template>
          </Column>
          <Column
            field="ano"
            header="Ano"
            filterMatchMode="startsWith"
            filterField="ano"
            ref="ano"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="number"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Pesquisar por ano"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.ano }}
            </template>
          </Column>
          <Column
            field="mes"
            header="Mês"
            filterMatchMode="startsWith"
            filterField="mes"
            ref="mes"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="number"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Pesquisar por mês"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.mes }}
            </template>
          </Column>
          <Column
            field="documento"
            header="Documento"
            filterMatchMode="startsWith"
            filterField="documento"
            ref="documento"
          >
            <template #body="slotProps">
              {{ slotProps.data.documento }}
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
  <dialog-form :objSelected="obj" @findAll="findAll" />
  <!--FIM MODAL CADASTRAR-->
</template>

<script>
//models
import Frequencia from "../../models/frequencia";

//Services
import FrequenciaService from "../../service/frequencia/frequencia_service";

//components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      loading: false,
      list: null,
      obj: new Frequencia(),
      filters: {
        "funcionario.matricula": { value: "", matchMode: "contains" },
        ano: { value: "", matchMode: "contains" },
        mes: { value: "", matchMode: "contains" },
      },
      service: new FrequenciaService(),
      lazyParams: {},
      totalRecords: null,
    };
  },
  mounted() {
    this.loading = true;

    this.lazyParams = {
      first: 0,
      rows: this.$refs.dt.rows,
      sortField: null,
      sortOrder: null,
      matricula: "",
      mes: "",
      ano: "",
    };

    this.loadLazyData();
  },
  methods: {
    showCreate() {
      this.obj = new Frequencia();
      this.$store.state.views.frequency.dialogForm = true;
    },
    showUpdate(obj) {
      this.obj = obj;
      this.$store.state.views.frequency.dialogForm = true;
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
      this.lazyParams.matricula = event.filters['funcionario.matricula'].value;
      this.lazyParams.ano = event.filters.ano.value;
      this.lazyParams.mes = event.filters.mes.value;
      this.loadLazyData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../App.scss");
</style>

<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Gerenciamento de Setores" style="height: 100%">
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
          :value="sectors"
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
          :globalFilterFields="['nome', 'sigla', 'tipoSetor', 'ativo']"
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
            field="sigla"
            header="Sigla"
            filterMatchMode="startsWith"
            filterField="sigla"
            ref="sigla"
          >
            <template #filter="{ filterModel, filterCallback }">
              <InputText
                type="text"
                v-model="filterModel.value"
                @keydown.enter="filterCallback()"
                class="p-column-filter"
                placeholder="Pesquisar por sigla"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.sigla }}
            </template>
          </Column>
          <Column
            field="tipoSetor"
            header="Tipo Setor"
            filterMatchMode="startsWith"
            filterField="tipoSetor"
            ref="tipoSetor"
          >
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown
                v-model="filterModel.value"
                @change="filterCallback()"
                class="p-column-filter"
                :options="TipoSetor"
                optionValue="key"
                optionLabel="name"
                placeholder="Tipo de Setor"
              />
            </template>
            <template #body="slotProps">
              {{ slotProps.data.tipoSetor }}
            </template>
          </Column>
          <Column
            field="ativo"
            header="Ativo"
            ref="ativo"
            filterMatchMode="startsWith"
            filterField="ativo"
          >
            <template #filter="{ filterModel, filterCallback }">
              <Dropdown
                v-model="filterModel.value"
                @change="filterCallback()"
                class="p-column-filter"
                :options="Ativo"
                optionValue="key"
                optionLabel="name"
                placeholder="Ativo"
              />
            </template>
            <template #body="slotProps">
              <span class="p-column-title">Ativo:</span>
              <span
                v-if="slotProps.data.ativo === true"
                :class="'user-badge status-' + slotProps.data.ativo"
                @click="changeStatus(slotProps.data)"
                v-tooltip.top="'Clique para INATIVAR'"
                style="cursor: pointer"
                >Ativo</span
              >
              <span
                v-if="slotProps.data.ativo === false"
                :class="'user-badge status-' + slotProps.data.ativo"
                @click="changeStatus(slotProps.data)"
                v-tooltip.top="'CLIQUE ATIVAR'"
                style="cursor: pointer"
                >Inativo</span
              >
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
  <dialog-form :sectorSelected="sector" @findAll="findAll" />
  <!--FIM MODAL CADASTRAR-->
</template>

<script>
//models
import Setor from "../../models/setor";

//Enums
import { TipoSetor } from "../../models/enums/tipo_setor";
import { Ativo } from "../../models/enums/ativo";

//Services
import SectorService from "../../service/sector/sector_service";

//components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      loading: false,
      sectors: null,
      sector: new Setor(),
      filters: {
        nome: { value: "", matchMode: "contains" },
        sigla: { value: "", matchMode: "contains" },
        tipoSetor: { value: "", matchMode: "contains" },
        ativo: { value: "", matchMode: "contains" },
      },
      service: new SectorService(),
      lazyParams: {},
      totalRecords: null,
      TipoSetor,
      Ativo,
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
      sigla: "",
      tipoSetor: "",
      ativo: "",
    };

    this.loadLazyData();
  },
  methods: {
    showCreate() {
      this.sector = new Setor();
      this.$store.state.views.sector.dialogForm = true;
    },
    changeStatus(sector) {
      this.sector = sector;
      this.sector.ativo = !this.sector.ativo;
      this.service
        .update(this.sector)
        .then((data) => {
          this.$msgSuccess(data);
          this.findAll();
        })
        .catch((error) => {
          this.$msgErro(error);
          console.error(error);
        });
    },
    showUpdate(sector) {
      this.sector = sector;
      this.$store.state.views.sector.dialogForm = true;
    },
    showRemove(sector) {
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.service
            .delete(sector.id)
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
        this.sectors = data.content;
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
      this.lazyParams.sigla = event.filters.sigla.value;
      this.lazyParams.tipoSetor = event.filters.tipoSetor.value;
      this.lazyParams.ativo = event.filters.ativo.value;
      this.loadLazyData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../App.scss");
</style>

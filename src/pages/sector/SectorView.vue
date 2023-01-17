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
          <template #end>
            <div
              class="table-header p-d-flex p-flex-column p-flex-md-row p-jc-md-between"
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
          :value="sectors"
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
          <Column header="Nome" field="nome" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.nome }}
            </template>
          </Column>
          <Column header="Sigla" field="sigla" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.sigla }}
            </template>
          </Column>
          <Column header="Tipo Setor" field="tipoSetor" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.tipoSetor }}
            </template>
          </Column>
          <Column field="ativo" header="Ativo" ref="ativo">
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
import { FilterMatchMode } from "primevue/api";

//models
import Setor from "../../models/setor";

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
      sectors: [],
      sector: new Setor(),
      permissoes: [],
      filters: {},
      filtersPermissions: {},
      sectorService: new SectorService(),
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
      this.sector = new Setor();
      this.$store.state.views.sector.dialogForm = true;
    },
    changeStatus(sector) {
      this.sector = sector;
      this.sector.ativo = !this.sector.ativo;
      this.sectorService
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
          this.sectorService
            .delete(sector.id)
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
      this.sectorService.findAll().then((data) => {
        this.sectors = data;
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

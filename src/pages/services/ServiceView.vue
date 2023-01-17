<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Gerenciamento de Serviços" style="height: 100%">
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
          :value="serviceList"
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
          <Column
            header="Categoria"
            field="category.description"
            :sortable="true"
          >
            <template #body="slotProps">
              {{ slotProps.data.category.description }}
            </template>
          </Column>
          <Column header="Acesso" field="generalAccess" :sortable="true">
            <template #body="slotProps">
              <a :href="slotProps.data.generalAccess">Acesse aqui</a>
            </template>
          </Column>
          <Column header="Status" field="generalAccess" :sortable="true">
            <template #body="slotProps">
              <span
                v-if="slotProps.data.status === true"
                :class="'user-badge status-' + slotProps.data.status"
                @click="changeStatus(slotProps.data)"
                v-tooltip.top="'Clique para INATIVAR'"
                style="cursor: pointer"
                >Ativo</span
              >
              <span
                v-if="slotProps.data.status === false"
                :class="'user-badge status-' + slotProps.data.status"
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
  <dialog-form :serviceSelected="service" @findAll="findAll" />
  <!--FIM MODAL CADASTRAR-->
</template>

<script>
import { FilterMatchMode } from "primevue/api";

//models
import Service from "../../models/service";

//Services
import ServiceService from "../../service/service/service";

//components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      loading: false,
      serviceList: [],
      service: new Service(),
      filters: {},
      serviceService: new ServiceService(),
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
      this.service = new Service();
      this.$store.state.views.service.dialogForm = true;
    },
    showUpdate(service) {
      this.service = service;
      this.$store.state.views.service.dialogForm = true;
    },
    showRemove(service) {
      this.service = service;
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          if (!this.service.image) {
            //console.log("imagem null");
            this.deleteData();
          } else {
            //console.log("imagem não null");
            this.deleteImage();
          }
        },
      });
    },
    deleteImage() {
      this.loading = true;
      this.$Firebase
        //.onDelete(`service/${this.service.id}`)
        .onDeleteByURL(this.service.image)
        .then(() => {
          this.deleteData();
          this.findAll();
        })
        .catch((err) => {
          this.loading = false;
          this.$toast.add({
            severity: "error",
            summary: "Alerta de Erro.",
            detail: err,
            life: 6000,
          });
        });
    },
    deleteData() {
      this.serviceService
        .delete(this.service.id)
        .then((data) => {
          this.$msgSuccess(data);
          this.findAll();
        })
        .catch((error) => {
          this.$msgErro(error);
          this.loading = false;
          console.error(error);
        });
    },
    changeStatus(service) {
      this.service = service;
      this.service.status = !this.service.status;
      this.serviceService
        .update(this.service)
        .then((data) => {
          this.$msgSuccess(data);
          this.findAll();
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    findAll() {
      this.loading = true;
      this.serviceService.findAll().then((data) => {
        this.serviceList = data;
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

<template>
  <div class="p-grid">
    <div class="p-col-12">
      <Panel header="Gerenciamento de Banners" style="height: 100%">
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
          :value="banners"
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
          <Column header="#" field="id" :sortable="true">
            <template #body="slotProps">
              {{ slotProps.data.id }}
            </template>
          </Column>
          <Column header="Imagem">
            <template #body="slotProps">
              <img :src="slotProps.data.image" class="product-image" />
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
  </div>

  <!--MODAL CADASTRAR-->
  <dialog-form :bannerSelected="banner" @findAll="findAll" />
  <!--FIM MODAL CADASTRAR-->

  <ConfirmDialog></ConfirmDialog>
</template>

<script>
import { FilterMatchMode } from "primevue/api";

//models
import BannerView from "../../models/banner_view";

//Services
import BannerService from "../../service/banner/banner_service";

//components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      loading: false,
      banners: [],
      banner: new BannerView(),
      permissoes: [],
      filters: {},
      filtersPermissions: {},
      bannerService: new BannerService(),
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
      this.banner = new BannerView();
      this.$store.state.views.banner.dialogForm = true;
    },
    showUpdate(banner) {
      this.banner = banner;
      this.$store.state.views.banner.dialogForm = true;
    },
    showRemove(banner) {
      this.banner = banner;
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.loading = true;
          this.$Firebase
            .onDeleteByURL(this.banner.image)
            .then(() => {
              this.deleteData();
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
      });
    },
    deleteData() {
      this.bannerService
        .delete(this.banner.id)
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
    findAll() {
      this.loading = true;
      this.bannerService.findAll().then((data) => {
        this.banners = data;
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
.product-image {
  width: 100px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}
</style>

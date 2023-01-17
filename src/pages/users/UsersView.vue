<template>
  <div class="p-col-12">
    <Panel header="Gerenciamento de Usuários">
      <Toolbar>
        <template #start>
          <Button
            label="Novo"
            icon="pi pi-plus"
            class="mr-2"
            @click="showCreate"
          />
        </template>
      </Toolbar>

      <DataTable
        :value="customers"
        :lazy="true"
        :paginator="true"
        :rows="10"
        v-model:filters="filters"
        ref="dt"
        dataKey="id"
        class="p-datatable-sm"
        :totalRecords="totalRecords"
        :loading="loading"
        @page="onPage($event)"
        @sort="onSort($event)"
        @filter="onFilter($event)"
        filterDisplay="row"
        responsiveLayout="scroll"
        v-model:selection="selectedCustomers"
      >
        <Column
          field="login"
          header="Login"
          filterMatchMode="startsWith"
          ref="login"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keydown.enter="filterCallback()"
              class="p-column-filter"
              placeholder="Pesquisar por Login"
            />
          </template>
          <template #body="slotProps">
            {{ slotProps.data.login }}
          </template>
        </Column>
        <Column
          field="person.name"
          header="Nome"
          filterMatchMode="startsWith"
          ref="person.name"
        >
          <template #body="slotProps">
            {{ slotProps.data.person.name }}
          </template></Column
        >
        <Column field="status" header="Status" ref="status">
          <template #body="slotProps">
            <span class="p-column-title">Status:</span>
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
        <Column>
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="showUpdate(slotProps.data)"
              v-tooltip.top="'CLIQUE PARA EDITAR'"
            />
            <Button
              icon="pi pi-lock"
              class="p-button-rounded p-button-info mr-2"
              @click="showResetPassword(slotProps.data)"
              v-tooltip.top="'CLIQUE PARA RESETAR A SENHA'"
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
    <dialog-form :userSelected="user" @findAll="loadLazyData" />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
//Models
import Users from "../../models/users";

//Services
import UsersService from "../../service/user/user_service";

//Components
import DialogForm from "./components/dialog-form.vue";

export default {
  components: {
    DialogForm,
  },
  data() {
    return {
      userService: new UsersService(),
      user: new Users(),
      loading: false,
      totalRecords: 0,
      customers: null,
      selectedCustomers: null,
      selectAll: false,
      filters: {
        login: { value: "", matchMode: "contains" },
      },
      lazyParams: {},
    };
  },
  mounted() {
    this.loading = true;

    this.lazyParams = {
      first: 0,
      rows: this.$refs.dt.rows,
      sortField: null,
      sortOrder: null,
      login: "",
    };

    this.loadLazyData();
  },
  methods: {
    showCreate() {
      this.user = new Users();
      this.$store.state.views.users.dialogForm = true;
    },
    showUpdate(user) {
      this.user = user;
      this.$store.state.views.users.dialogForm = true;
    },
    showResetPassword(user) {
      this.user = user;
      this.$confirm.require({
        header: "Deseja resetar a senha?",
        message: "Deseja resetar a senha do usuário?",
        icon: "pi pi-lock",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.userService
            .resetPassword(this.user)
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
    showRemove(user) {
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          this.userService
            .delete(user.id)
            .then((data) => {
              this.$msgSuccess(data);
              this.loadLazyData();
            })
            .catch((error) => {
              this.$msgErro(error);
              console.error(error);
            });
        },
      });
    },
    changeStatus(user) {
      this.user = user;
      this.user.status = !this.user.status;
      this.userService
        .updateStatus(user)
        .then((data) => {
          this.$msgSuccess(data);
          this.loadLazyData();
        })
        .catch((error) => {
          this.$msgErro(error);
          console.error(error);
        });
    },
    loadLazyData() {
      this.loading = true;
      this.userService.searching(this.lazyParams).then((data) => {
        this.customers = data.content;
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
    onFilter() {
      this.lazyParams.login = this.filters.login.value;
      this.loadLazyData();
    },
  },
};
</script>

<style lang="scss" scoped>
@import url("../../App.scss");
</style>

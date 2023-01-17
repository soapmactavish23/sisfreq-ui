<template>
  <div class="p-col-12">
    <Panel header="Gerenciamento de Pessoas">
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
        class="p-datatable-sm"
        dataKey="id"
        :totalRecords="totalRecords"
        :loading="loading"
        @page="onPage($event)"
        @sort="onSort($event)"
        @filter="onFilter($event)"
        filterDisplay="row"
        :globalFilterFields="[
          'name',
          'country.name',
          'company',
          'representative.name',
        ]"
        responsiveLayout="scroll"
        v-model:selection="selectedCustomers"
      >
        <Column
          field="name"
          header="Nome"
          filterMatchMode="startsWith"
          ref="name"
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
        </Column>
        <Column
          field="credential"
          header="Matricula"
          filterMatchMode="startsWith"
          ref="credential"
        >
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keydown.enter="filterCallback()"
              class="p-column-filter"
              placeholder="Pesquisar por Matricula"
            />
          </template>
        </Column>
        <Column field="cpf" header="CPF" filterMatchMode="startsWith" ref="cpf">
          <template #filter="{ filterModel, filterCallback }">
            <InputText
              type="text"
              v-model="filterModel.value"
              @keydown.enter="filterCallback()"
              class="p-column-filter"
              placeholder="Pesquisar por CPF"
            />
          </template>
        </Column>
        <Column
          field="contact"
          header="Contato"
          filterMatchMode="startsWith"
          ref="contact"
        />
        <Column
          field="dtBirdate"
          header="Data de Nascimento"
          filterMatchMode="startsWith"
          ref="dtBirdate"
        >
          <template #body="slotProps">{{
            $DateTime.formatarDate(slotProps.data.dtBirdate)
          }}</template></Column
        >
        <Column header="Ações">
          <template #body="slotProps">
            <Button
              icon="pi pi-pencil"
              class="p-button-rounded p-button-success mr-2"
              @click="showUpdate(slotProps.data)"
              v-tooltip.top="'CLIQUE PARA EDITAR'"
            />
            <Button
              icon="pi pi-camera"
              class="p-button-rounded p-button-info mr-2"
              @click="showUpload(slotProps.data)"
              v-tooltip.top="'CLIQUE PARA ENVIAR A FOTO'"
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
    <dialog-form :personSelected="person" @findAll="loadLazyData" />
    <dialog-upload :personSelected="person" @findAll="loadLazyData" />
    <ConfirmDialog></ConfirmDialog>
  </div>
</template>

<script>
//Models
import Person from "../../models/person";

//Services
import PersonService from "../../service/persons/person_service";

//Components
import DialogForm from "./components/dialog-form.vue";
import DialogUpload from "./components/dialog-upload.vue";

export default {
  components: {
    DialogForm,
    DialogUpload,
  },
  data() {
    return {
      personService: new PersonService(),
      person: new Person(),
      loading: false,
      totalRecords: 0,
      customers: null,
      selectedCustomers: null,
      selectAll: false,
      filters: {
        name: { value: "", matchMode: "contains" },
        credential: { value: "", matchMode: "contains" },
        cpf: { value: "", matchMode: "contains" },
      },
      lazyParams: {},
      firebase: null,
    };
  },
  mounted() {
    this.firebase = this.$Firebase;

    this.loading = true;

    this.lazyParams = {
      first: 0,
      rows: this.$refs.dt.rows,
      sortField: null,
      sortOrder: null,
      name: "",
      cpf: "",
      credential: "",
    };

    this.loadLazyData();
  },
  methods: {
    showCreate() {
      this.person = new Person();
      this.$store.state.views.persons.dialogForm = true;
    },
    showUpdate(person) {
      this.person = person;
      this.$store.state.views.persons.dialogForm = true;
    },
    showUpload(person) {
      this.person = person;
      this.$store.state.views.persons.dialogUpload = true;
    },
    showRemove(person) {
      this.person = person;
      this.$confirm.require({
        message: "Deseja Excluir esse registro?",
        header: "Deseja deletar?",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Sim",
        rejectLabel: "Não",
        accept: () => {
          if (this.person.image) {
            this.deleteImage();
          } else {
            this.deleteData();
          }
        },
      });
    },
    deleteImage() {
      this.loading = true;
      this.firebase
        .onDelete(`person/${this.person.id}`)
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
    deleteData() {
      this.personService
        .delete(this.person.id)
        .then((data) => {
          this.$msgSuccess(data);
          this.loadLazyData();
        })
        .catch((error) => {
          this.$msgErro(error);
          this.loading = false;
          console.error(error);
        });
    },
    loadLazyData() {
      this.loading = true;
      this.personService.searchPerson(this.lazyParams).then((data) => {
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
      this.lazyParams.name = this.filters.name.value;
      this.lazyParams.credential = this.filters.credential.value;
      this.lazyParams.cpf = this.filters.cpf.value;
      this.loadLazyData();
    },
  },
};
</script>

<style></style>

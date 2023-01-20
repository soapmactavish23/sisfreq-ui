<template>
  <div class="grid">
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3">Funcionários</span>
            <div class="text-900 font-medium text-xl">
              {{ totFuncionarios }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-blue-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-users text-blue-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Lotação e atuação diferentes</span
            >
            <div class="text-900 font-medium text-xl">
              {{ totLotacaoAtuacaoDiferentes }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-orange-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-map-marker text-orange-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Total enviadas em {{ new Date().getFullYear() }}</span
            >
            <div class="text-900 font-medium text-xl">{{ totEnviadas }}</div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-cyan-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-inbox text-cyan-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-3">
      <div class="card mb-0">
        <div class="flex justify-content-between mb-3">
          <div>
            <span class="block text-500 font-medium mb-3"
              >Origem e atuação diferentes em 2023</span
            >
            <div class="text-900 font-medium text-xl">
              {{ totLotacaoAtuacaoDiferentes }}
            </div>
          </div>
          <div
            class="flex align-items-center justify-content-center bg-purple-100 border-round"
            style="width: 2.5rem; height: 2.5rem"
          >
            <i class="pi pi-comment text-purple-500 text-xl"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 lg:col-6 xl:col-6">
      <canvas id="chart-total-situacao"></canvas>
    </div>
  </div>
</template>

<script>
//SERVICE
import FuncionarioService from "../../service/funcionario/funcionario_service";
import FrequenciaService from "../../service/frequencia/frequencia_service";

export default {
  data() {
    return {
      funcionarioService: new FuncionarioService(),
      freqService: new FrequenciaService(),
      totFuncionarios: null,
      totLotacaoAtuacaoDiferentes: null,
      totEnviadas: null,
      totPorSituacao: null,
    };
  },
  mounted() {
    this.getTotFuncionarios();
    this.getTotLotacaoAtuacaoDiferentes();
    this.getTotFrequencias();

    this.getTotalSituacao();
  },
  methods: {
    getTotFuncionarios() {
      this.funcionarioService
        .totalFuncionarios()
        .then((data) => (this.totFuncionarios = data));
    },
    getTotLotacaoAtuacaoDiferentes() {
      this.freqService
        .totalFrequenciasOrigemAtuacaoDiferentes()
        .then((data) => (this.totLotacaoAtuacaoDiferentes = data));
    },
    getTotFrequencias() {
      this.freqService.totalFrequencias().then((data) => {
        this.totEnviadas = data;
      });
    },
    getTotalSituacao() {
      this.funcionarioService.totalFuncionariosSituacao().then((data) => {
        console.log(data);
      })
    },
  },
};
</script>

<style></style>

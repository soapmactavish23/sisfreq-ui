<template>
  <Panel :header="`Bem vindo ${userLogged.nome}`">
    <div v-for="service in services" :key="service.id">
      <div class="product-item">
        <div class="image-container">
          <img :src="service.image" />
          <!-- <img src="../../../public/images/sespa/brasao.svg" /> -->
        </div>
        <div class="product-list-detail">
          <h6 class="mb-2">{{ service.name }}</h6>
          <i class="pi pi-tag product-category-icon"></i>
          <span class="product-category">{{ service.description }}</span>
        </div>
        <div class="product-list-action">
          <a :href="service.generalAccess" class="mb-2">
            Acesse aqui
            <i class="pi pi-arrow-circle-right product-category-icon"></i
          ></a>
          <span class="user-badge status-true">{{
            service.category.description
          }}</span>
        </div>
      </div>
      <hr />
    </div>
  </Panel>
</template>

<script>
//Models
// import UserAuth from "../../models/user_auth";

//Services
import ServiceService from "../../service/service/service";
import Token from "../../utilities/jwt/Token";

export default {
  data() {
    return {
      userLogged: {},
      token: new Token(),
      serviceService: new ServiceService(),
      services: [],
      myServicesId: [],
    };
  },
  mounted() {
    this.getUserLogged();
    this.getServices();
  },
  methods: {
    getUserLogged() {
      this.userLogged = this.$store.getters.getUserLogged;

      this.userLogged.services.forEach((s) =>
        this.myServicesId.push({ id: s.service })
      );
    },
    getServices() {
      this.serviceService.findAll().then((data) => {
        this.services = [];
        for (let i = 0; i < this.myServicesId.length; i++) {
          if (data[i].id) this.services.push(data[i]);
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.card {
  background: #ffffff;
  padding: 2rem;
  box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
    0 1px 3px 0 rgba(0, 0, 0, 0.12);
  border-radius: 4px;
  margin-bottom: 2rem;
}
.product-item {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 100%;

  img {
    width: 100px;
    // box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    margin-right: 1rem;
  }

  .product-list-detail {
    flex: 1 1 0;
  }

  .product-list-action {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  .product-category-icon {
    vertical-align: middle;
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }

  .product-category {
    vertical-align: middle;
    line-height: 1;
    font-size: 0.875rem;
  }
}

@media screen and (max-width: 576px) {
  .product-item {
    flex-wrap: wrap;

    .image-container {
      width: 100%;
      text-align: center;
    }

    img {
      margin: 0 0 1rem 0;
      width: 100px;
    }
  }
}
</style>

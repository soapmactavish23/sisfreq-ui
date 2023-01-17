<template>
  <div class="card card-carousel p-pt-4" align="center">
    <Carousel
      :value="banners"
      :numVisible="1"
      :numScroll="1"
      orientation="horizontal"
      verticalViewPortHeight="430px"
      style="max-width: 80%; margin-top: 12em"
      :responsiveOptions="responsiveOptions"
      :circular="true"
      :autoplayInterval="4000"
    >
      <template #item="slotProps">
        <div class="product-item text-center">
          <div class="product-item-content">
            <div class="mb-3">
              <img
                :src="slotProps.data.image"
                :alt="slotProps.data.name"
                class="img-fluid img-thumbnail"
              />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<script>
//Services
import BannerService from "../../../service/banner/banner_service";

export default {
  data() {
    return {
      bannerService: new BannerService(),
      banners: [],
    };
  },
  created() {},
  mounted() {
    this.bannerService.findAll().then((data) => {
      this.banners = data;
    });
  },
};
</script>

<style lang="scss" scoped>
.card-carousel {
  background-image: linear-gradient(
    to right bottom,
    rgb(7, 106, 165),
    rgb(41, 122, 174)
  );
  
}
.product-item {
  .product-item-content {
    // border: 1px solid var(--surface-border);
    border-radius: 3px;
    margin: 0.3rem;
    text-align: center;
    padding: 2rem 0;
  }

  .product-image {
    width: 80%;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
}
.p-carousel-indicator {
  background-color: rgb(255, 255, 255);
}
</style>

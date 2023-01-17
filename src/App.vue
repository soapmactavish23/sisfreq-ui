<template>
  <div :class="containerClass" @click="onWrapperClick">
    <AppTopBar @menu-toggle="onMenuToggle" />
    <div class="layout-sidebar" @click="onSidebarClick">
      <AppMenu :model="menu" @menuitem-click="onMenuItemClick" />
    </div>

    <Toast />
    <div class="layout-main-container">
      <div class="layout-main">
        <router-view />
      </div>
      <AppFooter />
    </div>

    <AppConfig :layoutMode="layoutMode" @layout-change="onLayoutChange" />
    <transition name="layout-mask">
      <div
        class="layout-mask p-component-overlay"
        v-if="mobileMenuActive"
      ></div>
    </transition>
    <dialog-change-password :user="user" />
  </div>
</template>

<script>
//COMPONENTS
import AppTopBar from "./components/menu/AppTopbar.vue";
import AppMenu from "./components/menu/AppMenu.vue";
import AppConfig from "./components/menu/AppConfig.vue";
import AppFooter from "./components/menu/AppFooter.vue";
import DialogChangePassword from "./pages/users/components/dialog-change-password.vue";

export default {
  emits: ["change-theme"],
  data() {
    return {
      user: null,
      layoutMode: "static",
      staticMenuInactive: false,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menu: [
        {
          label: "Principal",
          items: [
            {
              label: "Home",
              icon: "pi pi-fw pi-home",
              to: "/",
            },
          ],
        },
        {
          label: "Administração do Sistema",
          visible: () => {
            if (this.findPermission("ROLE_INTRANET_CADASTRAR_CAT_SERVICO")) {
              return true;
            } else if (this.findPermission("ROLE_INTRANET_CADASTRAR_SERVICO")) {
              return true;
            } else if (this.findPermission("ROLE_INTRANET_CADASTRAR_BANNER")) {
              return true;
            } else {
              return false;
            }
          },
          items: [
            {
              label: "Gerenciamento de Serviços",
              icon: "pi pi-fw pi-cog",
              to: "/services",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_SERVICO");
              },
            },
            {
              label: "Gerenciamento de Categoria de Serviços",
              icon: "pi pi-fw pi-clone",
              to: "/category-services",
              visible: () => {
                return this.findPermission(
                  "ROLE_INTRANET_CADASTRAR_CAT_SERVICO"
                );
              },
            },
            {
              label: "Gerenciamento de Banners",
              icon: "pi pi-fw pi-image",
              to: "/banner",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_BANNER");
              },
            },
          ],
        },
        {
          label: "Coordenação",
          visible: () => {
            if (this.findPermission("ROLE_INTRANET_PESQUISAR_PESSOA")) {
              return true;
            } else if (this.findPermission("ROLE_INTRANET_CADASTRAR_GENERO")) {
              return true;
            } else {
              return false;
            }
          },
          items: [
            {
              label: "Gerenciamento de Pessoas",
              icon: "pi pi-fw pi-users",
              to: "/persons",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_PESQUISAR_PESSOA");
              },
            },
            {
              label: "Gerenciamento de Gêneros",
              icon: "pi pi-fw pi-clone",
              to: "/genders",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_GENERO");
              },
            },
          ],
        },
        {
          label: "Gerenciamento de Setores",
          visible: () => {
            if (this.findPermission("ROLE_INTRANET_CADASTRAR_SETOR")) {
              return true;
            } else if (this.findPermission("ROLE_INTRANET_CADASTRAR_LOCAL")) {
              return true;
            } else {
              return false;
            }
          },
          items: [
            {
              label: "Gerenciamento de Setores",
              icon: "pi pi-fw pi-users",
              to: "/sectors",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_SETOR");
              },
            },
            {
              label: "Gerenciamento de Locais",
              icon: "pi pi-fw pi-clone",
              to: "/locals",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_LOCAL");
              },
            },
          ],
        },
        {
          label: "Administração e Usuários",
          items: [
            {
              label: "Gerenciamento de Usuários",
              icon: "pi pi-fw pi-users",
              to: "/users",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_USUARIO");
              },
            },

            {
              label: "Gerenciamento de Grupos",
              icon: "pi pi-fw pi-list",
              to: "/groups",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_GRUPO");
              },
            },
            {
              label: "Gerenciamento de Permissões",
              icon: "pi pi-fw pi-cog",
              to: "/permissions",
              visible: () => {
                return this.findPermission("ROLE_INTRANET_CADASTRAR_PERMISSAO");
              },
            },
            {
              label: "Alterar Senha",
              icon: "pi pi-fw pi-lock",
              command: () => {
                this.showChangePassword();
              },
            },
          ],
        },
      ],
    };
  },
  watch: {
    $route() {
      this.menuActive = false;
      this.$toast.removeAllGroups();
      this.$Token
        .checkToken()
        .then(() => {})
        .catch((error) => {
          if (this.$route.path !== "/") {
            this.$toast.add({
              severity: "warn",
              summary: "Atenção.",
              detail: error,
              life: 6000,
            });
            this.$route.push("/");
          }
        });
    },
  },
  created() {
    this.$store.dispatch("setUserLogged");
    this.user = this.$store.getters.getUserLogged;
  },
  methods: {
    findPermission(p) {
      if (this.user.authorities) {
        let isPermited = this.user.authorities.filter((a) => a == p);
        return isPermited.length > 0;
      } else {
        return false;
      }
    },
    showChangePassword() {
      this.$store.state.views.users.dialogChangePassword = true;
    },
    onWrapperClick() {
      if (!this.menuClick) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
      this.menuClick = false;
    },
    onMenuToggle() {
      this.menuClick = true;
      if (this.isDesktop()) {
        if (this.layoutMode === "overlay") {
          if (this.mobileMenuActive === true) {
            this.overlayMenuActive = true;
          }

          this.overlayMenuActive = !this.overlayMenuActive;
          this.mobileMenuActive = false;
        } else if (this.layoutMode === "static") {
          this.staticMenuInactive = !this.staticMenuInactive;
        }
      } else {
        this.mobileMenuActive = !this.mobileMenuActive;
      }

      event.preventDefault();
    },
    onSidebarClick() {
      this.menuClick = true;
    },
    onMenuItemClick(event) {
      if (event.item && !event.item.items) {
        this.overlayMenuActive = false;
        this.mobileMenuActive = false;
      }
    },
    onLayoutChange(layoutMode) {
      this.layoutMode = layoutMode;
    },
    addClass(element, className) {
      if (element.classList) element.classList.add(className);
      else element.className += " " + className;
    },
    removeClass(element, className) {
      if (element.classList) element.classList.remove(className);
      else
        element.className = element.className.replace(
          new RegExp(
            "(^|\\b)" + className.split(" ").join("|") + "(\\b|$)",
            "gi"
          ),
          " "
        );
    },
    isDesktop() {
      return window.innerWidth >= 992;
    },
    isSidebarVisible() {
      if (this.isDesktop()) {
        if (this.layoutMode === "static") return !this.staticMenuInactive;
        else if (this.layoutMode === "overlay") return this.overlayMenuActive;
      }

      return true;
    },
  },
  computed: {
    containerClass() {
      return [
        "layout-wrapper",
        {
          "layout-overlay": this.layoutMode === "overlay",
          "layout-static": this.layoutMode === "static",
          "layout-static-sidebar-inactive":
            this.staticMenuInactive && this.layoutMode === "static",
          "layout-overlay-sidebar-active":
            this.overlayMenuActive && this.layoutMode === "overlay",
          "layout-mobile-sidebar-active": this.mobileMenuActive,
          "p-input-filled": this.$primevue.config.inputStyle === "filled",
          "p-ripple-disabled": this.$primevue.config.ripple === false,
        },
      ];
    },
    logo() {
      return this.$appState.darkTheme
        ? "images/logo-white.svg"
        : "images/logo.svg";
    },
  },
  beforeUpdate() {
    if (this.mobileMenuActive)
      this.addClass(document.body, "body-overflow-hidden");
    else this.removeClass(document.body, "body-overflow-hidden");
  },
  components: {
    AppTopBar: AppTopBar,
    AppMenu: AppMenu,
    AppConfig: AppConfig,
    AppFooter: AppFooter,
    DialogChangePassword,
  },
};
</script>

<style lang="scss">
@import "./App.scss";
</style>

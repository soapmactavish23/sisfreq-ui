<template>
  <Dialog
    v-model:visible="visibleDialog"
    :style="{ width: widthDialog }"
    header="Esqueceu sua Senha?"
    :modal="true"
    @hide="hideDialog"
    class="p-fluid"
  >
    <div class="w-full md:w-10 mx-auto">
      <span class="p-input-icon-left">
        <i class="pi pi-envelope" />
        <InputText
          id="email"
          type="email"
          v-model="sendEmail.emailTo"
          placeholder="Informe o e-mail cadastrado."
        />
      </span>
    </div>

    <template #footer>
      <Button
        label="Recuperar"
        class="p-button"
        icon="pi pi-check-circle"
        :disabled="!sendEmail.emailTo"
        @click="send"
      />
      <Button
        label="Cancelar"
        icon="pi pi-times"
        class="p-button p-button-text"
        @click="hideDialog"
      />
    </template>
  </Dialog>
</template>
<script>
//Services
import EmailService from "../../../service/email/email_service";

export default {
  components: {},
  data() {
    return {
      submitted: false,
      widthDialog: "480px",
      sendEmail: {
        emailTo: null,
        subject: "Recuperação de Senha",
        text: null,
        hashCode: Math.floor(Date.now() * Math.random()).toString(18),
      },
      emailService: new EmailService(),
    };
  },
  computed: {
    visibleDialog: {
      get() {
        return this.$store.state.views.login.dialogFoggetPassword;
      },
      set(value) {
        this.$store.state.views.login.dialogFoggetPassword = value;
      },
    },
  },
  methods: {
    async send() {
      this.submitted = true;

      this.sendEmail.text =
        "<p style='text-align: justify;'>" +
        `<b> Prezado(a) senhor(a),</b> informamos que foi solicitado a recuperação de senha através deste e-mail pelo usuário ${this.sendEmail.emailTo}` +
        " valendo ressaltar que é de carácter integro e sigiloso que informações alteradas é de responsabilidade do próprio" +
        " usuário, caso você não seja o portador deste e-mail o ignore.</p>" +
        
        `<b>Código para Recuperação:</b> ${this.sendEmail.hashCode}.</b><br><br>` +

        `<b>Segue abaixo o link para recuperação de senha:</b><br><br> <a href='${(this._api_url =
          process.env.NODE_ENV === "production"
            ? window.location.origin + "/"
            : "http://localhost:8081/#/")}recoverPassword?email=${
          this.sendEmail.emailTo
        }'>` +
        "<button style='background: #069cc2; border-radius: 3px; padding: 10px; cursor: pointer; color: #fff; border: none; font-size: 16px;'>Link de Recuperação</button>" +
        "</a><h4>Atenciosamente, Ctis.</h4>";

      console.log(this.sendEmail);

      this.emailService
        .sendEmail(this.sendEmail)
        .then((response) => {
          if (response.status === 200) {
            this.$toast.add({
              severity: "success",
              summary: "Recuperação de senha.",
              detail: `O link de recuperação de senha foi enviado para e-mail ${this.sendEmail.emailTo}.`,
            });
            this.hideDialog();
          }
        })
        .catch((error) => {
          this.$msgErro(error);
        });
    },
    hideDialog() {
      this.sendEmail = {
        emailTo: null,
        subject: "Recuperação de Senha",
        text: null,
      };
      this.submitted = false;
      this.visibleDialog = false;
    },
  },
};
</script>
<style scoped></style>

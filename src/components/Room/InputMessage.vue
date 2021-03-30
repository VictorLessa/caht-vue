<template>
  <div class="d-flex input-message p-2">
    <div class="input-group">
      <input
        type="text"
        v-model="message"
        class="form-control"
        v-on:keyup.enter="submit"
        placeholder="Escreva uma mensagem"
      />
      <div class="input-group-append">
        <button class="btn send-message" @click="submit" type="button">
          Enviar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from "../../event-bus";
import { constants } from "../../services/Constants";
export default {
  data() {
    return {
      message: "",
    };
  },

  methods: {
    submit() {
      EventBus().emit(constants.events.app.MESSAGE_SENT, this.message);
      this.message = "";
    },
  },
};
</script>

<style scoped>
.input-message {
  position: absolute;
  bottom: 0;
  width: 100%;
}
.send-message {
  background: #131c21;
  color: white;
}
</style>

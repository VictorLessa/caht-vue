<template>
  <div class="row chat-room">
    <div class="bg"></div>
    <perfect-scrollbar ref="scrollToMe">
      <ul class="list">
        <li
          v-for="(item, index) in messages"
          :key="index"
          :class="
            `${item.token != $store.state.currentToken ? 'right' : 'left'}`
          "
        >
          <div class="card-message">
            <div class="mr-3">
              <p class="mb-0" :style="`color: ${item.color}`">
                {{ item.userName }}
              </p>
              <p class="mb-0" style="font-weight: 300">{{ item.message }}</p>
            </div>
            <div>
              <span style="font-size: .7rem">{{ hour() }}</span>
            </div>
          </div>
        </li>
      </ul>
    </perfect-scrollbar>
    <InputMessage />
  </div>
</template>

<script>
import InputMessage from "./InputMessage.vue";
export default {
  data() {
    return {
      messages: this.$store.state.messages,
    };
  },
  watch: {
    messages() {
      this.scrollToElement();
    },
  },
  methods: {
    scrollToElement() {
      const el = this.$el.querySelector(".ps");
      if (el) {
        console.log(el);
        el.scrollTop = el.scrollHeight + 50;
      }
    },
    hour() {
      const date = new Date();
      return `${date.getHours()}:${
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()
      }`;
    },
  },
  components: {
    InputMessage,
  },
};
</script>

<style scoped>
.chat-room {
  height: calc(100% - 50px);
  display: flex;
}
.list {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px;
}
.left {
  justify-content: flex-start;
  display: flex;
  text-align: left;
  padding: 5px;
  width: 100%;
}
.right {
  justify-content: flex-end;
  display: flex;
  text-align: right;
  padding: 5px;
  width: 100%;
}
.card-message {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  align-items: flex-end;
  padding: 5px;
  color: white;
  background-color: #262d31;
}
.bg {
  background-image: url("../../assets/fundoWpp.png");
  height: calc(100% - 50px);
  width: 100%;
  opacity: 0.1;
  position: absolute;
}
.ps {
  height: calc(100% - 50px);
  width: 100%;

  position: relative;
}
</style>

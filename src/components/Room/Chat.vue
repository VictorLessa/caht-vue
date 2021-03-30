<template>
  <div class="row chat-room">
    <perfect-scrollbar>
      <ul class="list">
        <li
          v-for="(item, index) in $store.state.messages"
          :key="index"
          :class="
            `${item.token != $store.state.currentToken ? 'right' : 'left'}`
          "
        >
          <div class="card-message">
            <p style="font-size: .8rem">{{ item.userName }}</p>
            {{ item.message }}
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
  components: {
    InputMessage,
  },
};
</script>

<style scoped>
.chat-room {
  background: #f8f9fa !important;
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
  padding: 10px;
  width: 100%;
}
.right {
  justify-content: flex-end;
  display: flex;
  text-align: right;
  padding: 10px;
  width: 100%;
}
.card-message {
  width: 50%;
  border-radius: 10px;
  padding: 10px;
  color: white;
  background-color: #262d31;
}
.ps {
  height: calc(100% - 50px);
  width: 100%;
}
</style>

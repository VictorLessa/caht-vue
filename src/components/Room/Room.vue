<template>
  <div class="col-md-10" style="height: 100%">
    <HeaderRoom />
    <Chat />
  </div>
</template>

<script>
import Chat from "./Chat.vue";
import HeaderRoom from "./HeaderRoom";

export default {
  components: {
    HeaderRoom,
    Chat,
  },
  created() {
    console.log(this);
  },
};
</script>

<style scoped></style>

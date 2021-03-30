<template>
  <div
    class="row header-chat align-items-center text-white"
    style="height: 50px"
  >
    <p class="mb-0 ml-2">
      {{ $store.state.userDetails.userName || "" }} - Sala:
      {{ $store.state.userDetails.room }}
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header-chat {
  background: #131c21;
  border-bottom: 1px solid rgba(241, 241, 242, 0.11);
}
</style>

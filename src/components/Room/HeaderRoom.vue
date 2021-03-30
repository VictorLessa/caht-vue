<template>
  <div
    class="row header-chat border-bottom align-items-center"
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

<style scoped></style>

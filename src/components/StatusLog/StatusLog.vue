<template>
  <div class="col-md-2 border-right" style="height: 100%">
    <div class="row border-bottom align-items-center" style="height: 50px">
      <p class=" ml-2 mb-0">Usuários logados</p>
    </div>
    <div class="row list-users-on-room pr-2">
      <perfect-scrollbar>
        <div
          v-for="(item, index) in $store.state.userStatus"
          :key="index"
          style="width: 90%"
          class="rounded ml-2 card-status-log py-2 my-1 text-left px-2"
        >
          <strong>{{ item.userName }}</strong>
        </div>
      </perfect-scrollbar>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.card-status-log {
  background: #e5effa !important;
}
.list-users-on-room {
  height: calc(100% - 50px);
  display: block;
}
.ps {
  height: calc(100% - 50px);
  height: 100%;
}
</style>

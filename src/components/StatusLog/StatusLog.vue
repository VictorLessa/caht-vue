<template>
  <div class="col-md-2 text-white" style="height: 100%">
    <div
      class="row sidebar-user-status align-items-center"
      style="height: 50px"
    >
      <p class=" ml-2 mb-0">Usuários logados</p>
    </div>
    <div class="row list-users-on-room">
      <perfect-scrollbar>
        <div
          v-for="(item, index) in $store.state.userStatus"
          :key="index"
          style="width: 100%"
          class="rounded  card-status-log py-2  text-left px-2"
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
  border-bottom: 1px solid rgba(241, 241, 242, 0.11);
}
.list-users-on-room {
  height: calc(100% - 50px);
  display: block;
  background: #131c21;
}
.ps {
  height: calc(100% - 50px);
  height: 100%;
}
.sidebar-user-status {
  background: #131c21;
  border-right: 1px solid rgba(241, 241, 242, 0.11);
  border-bottom: 1px solid rgba(241, 241, 242, 0.11);
}
</style>

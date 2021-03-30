<template>
  <div id="app">
    <div class="mx-4 rounded border chat">
      <div class="container-fluid" style="height: 100%">
        <div class="row" style="height: 100%">
          <StatusLog />
          <Room />
        </div>
      </div>
    </div>
    <b-modal @ok="connect" id="modal-1" title="BootstrapVue">
      <b-form-group id="input-group-1" label="Nome">
        <b-form-input
          id="input-1"
          v-model="userName"
          type="email"
          placeholder="Nome"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Sala" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="room"
          placeholder="Sala"
        ></b-form-input>
      </b-form-group>
    </b-modal>
  </div>
</template>

<script>
import StatusLog from "./components/StatusLog/StatusLog.vue";
import Room from "./components/Room/Room.vue";
import SocketClient from "./services/socketClient";
import EventBus from "./event-bus";
import CliConfig from "./config/index";
import EventManager from "./services/EventManager";
export default {
  name: "App",
  data() {
    return {
      userName: "",
      room: "",
    };
  },
  components: {
    StatusLog,
    Room,
  },
  async mounted() {
    this.$bvModal.show("modal-1");
  },
  methods: {
    async connect() {
      const cliConfig = new CliConfig({
        hostUri: process.env.VUE_APP_URL,
        username: this.userName,
        room: this.room,
      });

      this.$store.dispatch("userDetails", {
        userName: this.userName,
        room: this.room,
      });
      const socketClient = new SocketClient(cliConfig);
      await socketClient.initialize();

      const eventManager = new EventManager({
        componentEmitter: EventBus(),
        socketClient,
      });

      const events = eventManager.getEvents();
      socketClient.attachEvents(events);

      const data = {
        roomId: cliConfig.room,
        userName: cliConfig.username,
      };

      eventManager.joinRoomAndWaitForMessages(data);
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.chat {
  height: calc(100vh - 100px);
}
</style>

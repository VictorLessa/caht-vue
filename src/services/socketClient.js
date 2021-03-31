import Event from "../event-bus";
import { io } from "socket.io-client";
import Vue from "vue";
import store from "../store";

class SocketClient {
  #serverConnection = {};
  #serverListener = Event();
  constructor({ host, port, protocol }) {
    this.host = host;
    this.port = port;
    this.vue = new Vue({ store });
    this.protocol = protocol;
  }

  sendMessage(event, message) {
    console.log(event, this.#serverConnection, event);
    this.#serverConnection.emit(event, message);
  }

  attachEvents(events) {
    this.#serverConnection.on("data", (data) => {
      try {
        data
          .toString()
          .split("\n")
          .filter((line) => !!line)
          .map(JSON.parse)
          .map(({ event, message }) => {
            this.#serverListener.emit(event, message);
          });
      } catch (err) {
        console.log("invalid", data.toString(), err);
      }
    });

    this.#serverConnection.on("end", () => {
      console.log("I disconnected!!");
    });

    this.#serverConnection.on("error", (error) => {
      console.error("DEU RUIM", error);
    });

    for (const [key, value] of events) {
      this.#serverListener.on(key, value);
    }
  }

  async createConnection() {
    const socket = io.connect(`${this.host}:${this.port}`, {
      transports: ["websocket"],
    });

    return new Promise((resolve) => {
      resolve(socket);
    });
  }

  async initialize() {
    this.#serverConnection = await this.createConnection();

    this.#serverConnection.on("message", (data) => {
      this.vue.$store.dispatch("getNewMessage", data);
    });
    this.#serverConnection.on("details", (data) => {
      this.vue.$store.dispatch("getToken", data);
    });
    this.#serverConnection.on("updateUsers", (data) => {
      this.vue.$store.dispatch("connected", data);
    });
    this.#serverConnection.on("newUserConnected", (data) => {
      this.vue.$store.dispatch("connected", [data]);
    });
    this.#serverConnection.on("disconnectUser", (data) => {
      this.vue.$store.dispatch("disconnected", data);
    });
    console.log("I connection to the serve!!");
  }
}

export default SocketClient;

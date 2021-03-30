import { constants } from "./Constants.js";

export default class EventManager {
  allUsers = new Map();

  constructor({ componentEmitter, socketClient }) {
    this.componentEmitter = componentEmitter;
    this.socketClient = socketClient;
  }

  joinRoomAndWaitForMessages(data) {
    console.log("join", data, constants.events.socket.JOIN_ROOM);
    this.socketClient.sendMessage(constants.events.socket.JOIN_ROOM, data);

    this.componentEmitter.on(constants.events.app.MESSAGE_SENT, (msg) => {
      console.log("recebi mensagem");
      this.socketClient.sendMessage(constants.events.socket.MESSAGE, msg);
    });
  }

  updateUsers(users) {
    const connectedUSers = users;
    connectedUSers.forEach(({ id, userName }) =>
      this.allUsers.set(id, userName)
    );
    this.updateUsersComponent();
  }

  disconnectUser(user) {
    const { id, userName } = user;
    this.allUsers.delete(id);

    this.updateActivityLogComponent(`${userName} left!`);
    this.updateUsersComponent();
  }

  message(message) {
    console.log("message", constants.events.app.MESSAGE_RECEIVED);
    this.componentEmitter.emit(constants.events.app.MESSAGE_RECEIVED, message);
  }

  newUserConnected(message) {
    const user = message;
    this.allUsers.set(user.id, user.userName);
    this.updateUsersComponent();
    this.updateActivityLogComponent(`${user.userName} joined!`);
  }

  updateActivityLogComponent(message) {
    this.componentEmitter.emit(
      constants.events.app.ACTIVITYLOG_UPDATED,
      message
    );
  }

  updateUsersComponent() {
    this.componentEmitter.emit(
      constants.events.app.STATUS_UPDATED,
      Array.from(this.allUsers.values())
    );
  }

  getEvents() {
    const functions = Reflect.ownKeys(EventManager.prototype)
      .filter((fn) => fn !== "constructor")
      .map((name) => [name, this[name].bind(this)]);

    return new Map(functions);
  }
}

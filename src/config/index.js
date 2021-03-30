const PRODUCTION = "https://hacker-chat-er.herokuapp.com/";

class CliConfig {
  constructor({ username, room, hostUri = PRODUCTION }) {
    this.username = username;
    this.room = room;

    const { hostname, port, protocol } = new URL(hostUri);

    this.host = hostname;
    this.port = port;
    this.protocol = protocol.replace(/\W/, "");
  }
}

module.exports = CliConfig;

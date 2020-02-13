const WebSocket = require("ws");

class ReloadChromeExtensionPlugin {
  constructor(manifestName) {
    const wss = new WebSocket.Server({ port: 8081 });

    wss.on("connection", ws => {
      this.ws = ws;
      console.log("Websocket connection!");
    });

    this.manifestName = manifestName;
  }

  apply(compiler) {
    compiler.hooks.done.tap("Reload Chrome Extension Plugin", stats => {
      if (this.ws) {
        this.ws.send(this.manifestName);
      }
    });
  }
}

module.exports = ReloadChromeExtensionPlugin;

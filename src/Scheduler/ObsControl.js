import OBSWebSocket from 'obs-websocket-js';

class ObsControl {

  obsWebSocket = new OBSWebSocket();

  activeScene = false;

  constructor() {
    this.obsWebSocket.connect({ address: 'localhost:4444' }).then(() => {this.connectionEstablished()});
  }

  connectionEstablished() {
    this.obsWebSocket.send("SetCurrentScene", { "scene-name": "Scene 1" });
  }

  switchToSource(url) {
    var sceneNum = this.activeScene ? "1" : "2" 
    this.obsWebSocket.send("SetCurrentScene", { "scene-name": "Scene " + sceneNum });
    this.obsWebSocket.send("SetSourceSettings", {sourceName: sceneNum, sourceSettings: {input: url}}).then((result) => {console.log(result)});
    this.activeScene = !this.activeScene;
  }

}
export default ObsControl;

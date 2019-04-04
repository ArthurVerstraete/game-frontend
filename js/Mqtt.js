/*jshint esversion: 6 */
arrayPlayers = [];
class Mqtt {
  constructor(scene) {
    this.scene = scene;
    let mqtt = this;
    this.client = new Paho.MQTT.Client("mqtt.labict.be", 1884, "");

    // set callback handlers
    this.client.onConnectionLost = function(responseObject) {
      if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
      }
    };
    //console.log(this);
    this.client.onMessageArrived = function(message) {
      let receivedMessage = JSON.parse(message.payloadString);

      Object.keys(receivedMessage.players).forEach(player => {
        if (!arrayPlayers[player]) {
          arrayPlayers[player] = mqtt.scene.createTankSprite(receivedMessage);
        }
      });

      console.log(receivedMessage);
      mqtt.scene.setTankPosition(receivedMessage);
    };
    // connect the client
    this.client.connect({
      onSuccess: function() {
        // Once a connection has been made, make a subscription and send a message.
        console.log("onConnect");
        mqtt.client.subscribe("game2/replicated");
        let message = new Paho.MQTT.Message("Hello");
        message.destinationName = "World";
        mqtt.client.send(message);
      }
    });
  }
}

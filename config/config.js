
module.exports = function (RED) {
  function ConfigNode(config) {
    RED.nodes.createNode(this, config);
    this.accessKeyId = config.accessKeyId;
    this.secretAccessKey = config.secretAccessKey;
    this.region = config.region;
  }

  RED.nodes.registerType("presign-config", ConfigNode);
}
const {GetObjectCommand, S3Client} = require("@aws-sdk/client-s3");
const {getSignedUrl} = require("@aws-sdk/s3-request-presigner");


module.exports = function (RED) {
  function PresignNode(config) {
    RED.nodes.createNode(this, config);
    const node = this;
    const credentials = RED.nodes.getNode(config.credentials);

    node.on('input', function (msg) {
      const client = new S3Client({
        region: credentials.region,
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
        },
      });
      const command = new GetObjectCommand({
        Bucket: msg.payload.bucket,
        Key: msg.payload.key,
      });

      msg.payload = getSignedUrl(client, command, {expiresIn: 3600});
    });
  }

  RED.nodes.registerType("presign", PresignNode);
}
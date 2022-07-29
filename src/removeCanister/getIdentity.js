const fs = require('fs');
const path = require('path');
const { Ed25519KeyIdentity} = require('@dfinity/identity');

const self = {
  getIdentity,
};

module.exports = self;

// Private key and public key are included
function getIdentity() {
  let pem = fs.readFileSync(path.join(__dirname + '/../certificates/identity.pem')).toString();

  pem = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace("\n", "")
    .trim();

  const raw = Buffer.from(pem, "base64")
    .toString("hex")
    .replace("3053020101300506032b657004220420", "")
    .replace("a123032100", "");

  // including private key (32 bytes before public key) and public key (last 32 bytes)
  const key = new Uint8Array(Buffer.from(raw, "hex"));
  const identity = Ed25519KeyIdentity.fromSecretKey(key);
  console.log("Principal:", identity.getPrincipal().toText());

  return identity;
}
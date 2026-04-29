const crypto = require("crypto");

function encryptHybridMessage(message, publicKey) {
  // Generate AES key (for message encryption)
  const aesKey = crypto.randomBytes(32);

  // Generate IV (initialization vector)
  const iv = crypto.randomBytes(16);

  // Encrypt the message using AES
  const cipher = crypto.createCipheriv("aes-256-cbc", aesKey, iv);

  let encryptedContent = cipher.update(message, "utf8", "base64");
  encryptedContent += cipher.final("base64");

  // Encrypt the AES key using RSA public key
  const encryptedKey = crypto
    .publicEncrypt(publicKey, aesKey)
    .toString("base64");

  return {
    encryptedContent,
    encryptedKey,
    iv: iv.toString("base64"),
  };
}

module.exports = encryptHybridMessage;

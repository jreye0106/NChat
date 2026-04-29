const { generateKeyPair } = require("../security/encryption");

const { publicKey: TEMP_PUBLIC_KEY, privateKey: TEMP_PRIVATE_KEY } = generateKeyPair();
const { encryptMessage, decryptMessage } = require("../security/encryption");
const router = require('express').Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.post('/send', auth, async (req, res) => {
  const { receiverId, message: plainText } = req.body;
  const encryptedContent = encryptMessage(plainText, "TEMP_PUBLIC_KEY");

  const message = new Message({
    senderId: req.user.id,
    receiverId,
    encryptedContent
  });

  await message.save();
  res.json(message);
});

router.get('/:userId', auth, async (req, res) => {
  const messages = await Message.find({
    $or: [
      { senderId: req.user.id, receiverId: req.params.userId },
      { senderId: req.params.userId, receiverId: req.user.id }
    ]
  });

  const decryptedMessages = messages.map(msg => ({
    ...msg._doc,
    decryptedContent: decryptMessage(msg.encryptedContent, "TEMP_PRIVATE_KEY")
}));

res.json(decryptedMessages);
});

module.exports = router;

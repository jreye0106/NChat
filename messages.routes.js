const { encryptMessage, decryptMessage } = require("../security/encryption");
const router = require('express').Router();
const Message = require('../models/Message');
const auth = require('../middleware/auth');

router.post('/send', auth, async (req, res) => {
  const { receiverId, message } = req.body;
  const encryptedContent = encryptMessage(message, "TEMP_PUBLIC_KEY");

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

  res.json(messages);
});

module.exports = router;

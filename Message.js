const messageSchema = new mongoose.Schema({
  senderId: String,
  receiverId: String,
  encryptedContent: String,
  read: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Message', messageSchema);

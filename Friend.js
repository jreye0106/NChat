const friendSchema = new mongoose.Schema({
  requesterId: String,
  receiverId: String,
  status: String
}, { timestamps: true });

module.exports = mongoose.model('Friend', friendSchema);

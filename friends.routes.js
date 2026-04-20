
router.post('/decline', auth, async (req, res) => {
  await Friend.findByIdAndDelete(req.body.requestId);
  res.json({ msg: 'Declined' });
});

router.get('/list', auth, async (req, res) => {
  const friends = await Friend.find({
    $or: [
      { requesterId: req.user.id },
      { receiverId: req.user.id }
    ],
    status: 'accepted'
  });

  res.json(friends);
});

module.exports = router;

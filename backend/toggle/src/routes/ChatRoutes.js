const express = require("express");
const router = express.Router();
const {
  getUser,
  sendMessage,
  getMessage,
} = require("../controller/chatController");

router.get("/search", getUser);
router.post("/send-message", sendMessage);
router.get("/message/:username", getMessage);
module.exports = router;

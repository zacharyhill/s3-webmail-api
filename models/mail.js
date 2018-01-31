const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('Mail', new Schema({
  subject: String,
  from: Object,
  to: Object,
  cc: Object,
  bcc: Object,
  date: Object,
  messageId: String,
  inReplyTo: String,
  'reply-to': String,
  html: String,
  text: String,
  attachments: Array,
  read: Boolean,
}));
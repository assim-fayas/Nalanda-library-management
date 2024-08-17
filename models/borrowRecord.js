// borrowRecord model

const mongoose = require("mongoose");

const borrowRecordSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  borrowedAt: {
    type: Date,
    default: Date.now,
  },
  returnedAt: {
    type: Date,
    validate: {
      validator: function (value) {
        return value >= this.borrowedAt;
      },
      message: "Return date must be after borrow date",
    },
  },
});

module.exports = mongoose.model("BorrowRecord", borrowRecordSchema);

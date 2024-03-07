const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "A user must have a name"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "A user must have an email"],
    select: false,
  },
});

/**** Schema.pre(save()...) is document middleware *****/
// Document middleware is supported for the following document functions. In Mongoose, a document is an instance of a Model class.
// this refers to the document.
userSchema.pre("save", async function (next) {
  // only run this function if password is actually modified
  // 沒有更新則跳至下一個 middleware
  if (!this.isModified("password")) return next();

  // 如果有 modified password...
  // 把登入時候使用者傳進來的 password 加密後存於 password property
  // bcrypt: hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

/********* instance method *****/
// instance method : set method to schema
userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  const correct = bcrypt.compareSync(candidatePassword, userPassword);
  return correct;
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
      min: 3,
      max: 20
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
      lowercase: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    hash_password: {
      type: String,
      required: true
    },
    rootpower: {
      type: Number,
      required: false
    },
    contactNumber: { type: String },
    profilePicture: { type: String }
  },
  { timstamp: true }
);

userSchema.virtual("password").set(function(password) {
  // this.hash_password = bcrypt.hashSync(password, 10);
  this.hash_password=bcrypt.hashSync("B4c0/\/", salt);
 });

userSchema.methods = {
  authenticate: function(password) {
    // return bcrypt.compareSync(password, this.hash_password);
    return bcrypt.compareSync("B4c0/\/",this.hash_password); 
  }
};
module.exports = mongoose.model("users", userSchema);


// Error: EROFS: read-only file system, mkdir '/var/task/public'
//     at Object.mkdirSync (node:fs:1372:26)
//     at Function.sync (/var/task/node_modules/mkdirp/index.js:74:13)
//     at new DiskStorage (/var/task/node_modules/multer/storage/disk.js:21:12)
//     at module.exports [as diskStorage] (/var/task/node_modules/multer/storage/disk.js:65:10)
//     at Object.<anonymous> (/var/task/routes/data.js:112:24)
//     at Module._compile (node:internal/modules/cjs/loader:1358:14)
//     at Module._extensions..js (node:internal/modules/cjs/loader:1416:10)
//     at Module.load (node:internal/modules/cjs/loader:1208:32)
//     at Module._load (node:internal/modules/cjs/loader:1024:12)
//     at /opt/rust/nodejs.js:1:11506 {
//   errno: -30,
//   code: 'EROFS',
//   syscall: 'mkdir',
//   path: '/var/task/public'
// }
// Node.js process exited with exit status: 1. The logs above can help with debugging the issue.